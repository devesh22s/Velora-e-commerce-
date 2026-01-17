import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// --- RAZORPAY INSTANCE ---
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- 1. CHECKOUT (Secure Price Calculation) ---
export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    let totalAmount = 0;

    // Price calculation from DB
    for (const item of cartItems) {
        const product = await Product.findOne({ STYLE: item.STYLE });
        if (product) {
            totalAmount += product.MRP * item.quantity;
        }
    }

    const options = {
      amount: Number(totalAmount * 100), 
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- 2. PAYMENT VERIFICATION ---
export const paymentVerification = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderItems, // Backend expects 'orderItems'
      shippingInfo, 
      totalAmount,
      userId, 
      userEmail, 
      userName   
    } = req.body;

    // Robust User Check
    const finalUserId = req.user?._id || req.user?.id || userId;
    const finalEmail = req.user?.email || userEmail;
    const finalName = req.user?.name || userName;

    if (!finalUserId || !finalEmail) {
        return res.status(400).json({ success: false, message: "User details missing." });
    }

    // Signature Verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET || process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      
      // Save Order
      await Order.create({
        user: finalUserId,
        customerName: finalName, 
        email: finalEmail,
        shippingInfo,
        items: orderItems.map((item) => ({
          product: item._id || item.product || item.STYLE,
          name: item.STYLE_NAME || item.name,
          quantity: item.quantity,
          price: item.MRP || item.price,
          image: item.IMAGE_URL || item.image,
          style: item.selectedVariant?.AGE || item.size || "Standard", 
          styleCode: item.STYLE || item.styleCode
        })),
        totalAmount,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "Ordered", 
        timeline: [{ status: "Ordered", message: "Order placed successfully", timestamp: Date.now() }],
        paidAt: Date.now(),
      });

      // Stock Deduction
      for (const item of orderItems) {
        const product = await Product.findOne({ STYLE: item.STYLE || item.styleCode });
        if (product) {
            const sizeToCheck = item.selectedVariant?.AGE || item.size;
            const variantIndex = product.VARIANTS.findIndex(v => v.AGE === sizeToCheck);
            if (variantIndex !== -1) {
                product.VARIANTS[variantIndex].STOCK_QTY -= item.quantity;
                if (product.VARIANTS[variantIndex].STOCK_QTY <= 0) {
                    product.VARIANTS[variantIndex].STATUS = "Out of Stock";
                }
                await product.save();
            }
        }
      }

      // ✅ FIX: No Redirect, Send JSON Success
      res.status(200).json({ 
          success: true, 
          message: "Payment Verified",
          reference: razorpay_payment_id 
      });

    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};