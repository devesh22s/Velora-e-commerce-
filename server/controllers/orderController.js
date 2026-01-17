import Order from '../models/Order.js';
import sendEmail from '../utils/sendEmail.js';

// ==========================================
// 1. CUSTOMER FUNCTIONS
// ==========================================

// --- CREATE NEW ORDER ---
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingInfo,
      paymentInfo,
      totalAmount,
    } = req.body;

    // ✅ FIX: User ID safely nikalna
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated properly" });
    }

    const order = await Order.create({
      items, 
      shippingInfo,
      paymentInfo,
      totalAmount,
      paidAt: Date.now(),
      user: userId, // ✅ Fixed ID
      customerName: req.user.name,
      email: req.user.email,
      status: "Ordered",
      timeline: [
        {
            status: "Ordered",
            message: "Order placed successfully",
            timestamp: Date.now()
        }
      ]
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// --- GET MY ORDERS (CRASH FIXED) ---
export const myOrders = async (req, res) => {
    try {
        // ✅ FIX 1: Wapis aapka purana logic + Safety Check
        const userId = req.user?._id || req.user?.id;

        console.log("Fetching orders for User:", userId);

        // Agar userId abhi bhi undefined hai, to crash mat hone do
        if (!userId) {
            console.error("❌ Error: User ID is missing in Request");
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        // ✅ FIX 2: String vs ObjectId Match (Safe way)
        const orders = await Order.find({ 
            $or: [
                { user: userId },           
                { user: userId.toString() } 
            ]
        }).sort({ createdAt: -1 });

        console.log(`Orders Found: ${orders.length}`);
        res.status(200).json(orders);

    } catch (error) {
        console.error("MyOrders Error:", error);
        res.status(500).json({ message: "Error fetching orders" });
    }
};

// --- GET LAST ORDER ADDRESS ---
export const getLastOrderAddress = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id; // ✅ Safety Fix Here Too

    const lastOrder = await Order.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select('shippingInfo customerName');

    if (lastOrder && lastOrder.shippingInfo) {
      return res.json({ 
        shippingInfo: lastOrder.shippingInfo,
        name: lastOrder.customerName 
      });
    } else {
      return res.json({ message: "No previous address found" });
    }
  } catch (error) {
    console.error("Address Fetch Error:", error);
    res.status(500).json({ message: "Error fetching address" });
  }
};

// ==========================================
// 2. ADMIN FUNCTIONS (OTP & STATUS)
// ==========================================

// --- GENERATE DELIVERY OTP ---
export const generateDeliveryOTP = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email name');
    
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Priority: 1. Order Email -> 2. Shipping Email -> 3. User Account Email
    const recipientEmail = order.email || order.shippingInfo?.email || order.user?.email;

    console.log(`[OTP DEBUG] Order ID: ${order._id}`);
    console.log(`[OTP DEBUG] Found Email: ${recipientEmail}`);

    if (!recipientEmail) {
        return res.status(400).json({ 
            success: false, 
            message: "Customer email missing. Cannot send OTP." 
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    order.deliveryOTP = otp;
    order.deliveryOTPExpire = Date.now() + 15 * 60 * 1000; // 15 mins
    await order.save();

    const message = `Hello ${order.customerName || 'Customer'},\n\nYour Delivery Verification OTP is: ${otp}.\n\nPlease share this with the delivery agent ONLY when you receive the package.\n\nThanks,\nVelora Team`;
    
    await sendEmail({
      email: recipientEmail,
      subject: `Delivery OTP for Order #${order._id.toString().slice(-6).toUpperCase()}`,
      message
    });

    console.log(`✅ OTP sent to ${recipientEmail}`);
    res.status(200).json({ success: true, message: "OTP sent to customer" });

  } catch (error) {
    console.error("OTP Generation Error:", error);
    res.status(500).json({ message: "Email service failed." });
  }
};

// --- VERIFY OTP & DELIVER ---
export const verifyDeliveryOTPAndDeliver = async (req, res) => {
  try {
    const { otp } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.deliveryOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP." });
    }
    
    if (order.deliveryOTPExpire < Date.now()) {
        return res.status(400).json({ message: "OTP Expired." });
    }

    // Mark as Delivered
    order.status = "Delivered";
    order.deliveredAt = Date.now();
    order.deliveryOTP = undefined;
    order.deliveryOTPExpire = undefined;
    
    order.timeline.push({
      status: "Delivered",
      message: "Delivered successfully after OTP verification",
      timestamp: Date.now()
    });
    
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- NORMAL STATUS UPDATE ---
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id; 
    const { status, message } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    
    order.timeline.push({
      status: status,
      message: message || `Order status updated to ${status}`,
      timestamp: Date.now()
    });

    await order.save();
    res.status(200).json(order);

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};