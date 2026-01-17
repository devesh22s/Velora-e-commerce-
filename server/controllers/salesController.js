import Order from '../models/Order.js';
import Product from '../models/Product.js'; // ✅ Product Model Import zaroori hai

// --- 1. ADD SALE (Manual Entry with Stock Deduction) ---
export const addSale = async (req, res) => {
  try {
    // Frontend se ye data aana chahiye:
    // items: [{ STYLE: '1001', size: '2-3Y', quantity: 1, price: 500, name: 'T-Shirt' }]
    const { items, totalAmount, paymentId, customerName, email } = req.body;

    // --- STEP 1: STOCK CHECK & DEDUCTION (Inventory Logic) ---
    // Hum har item ko check karenge ki stock hai ya nahi
    for (const item of items) {
        // 1. Product dhoondo Style Code se
        const product = await Product.findOne({ STYLE: item.STYLE });

        if (!product) {
            return res.status(404).json({ error: `Product not found: ${item.name || item.STYLE}` });
        }

        // 2. Variant (Size) dhoondo
        const variantIndex = product.VARIANTS.findIndex(v => v.AGE === item.size);

        if (variantIndex === -1) {
            return res.status(400).json({ error: `Size ${item.size} not found for product ${item.name}` });
        }

        const currentStock = product.VARIANTS[variantIndex].STOCK_QTY;

        // 3. Stock Check
        if (currentStock < item.quantity) {
            return res.status(400).json({ 
                error: `Out of Stock: ${item.name} (${item.size}) only has ${currentStock} units left.` 
            });
        }

        // 4. Stock Deduct (Minus karo)
        product.VARIANTS[variantIndex].STOCK_QTY -= item.quantity;

        // 5. Status Update (Agar 0 ho gaya to Out of Stock mark karo)
        if (product.VARIANTS[variantIndex].STOCK_QTY === 0) {
            product.VARIANTS[variantIndex].STATUS = 'Out of Stock';
        }

        // 6. Save Product (Inventory Updated!)
        await product.save();
    }

    // --- STEP 2: CREATE ORDER ---
    const newOrder = new Order({
      customerName: customerName || req.user?.name || 'Walk-in Customer',
      email: email || req.user?.email || 'manual@store.com',
      user: req.user?._id || null, // Agar admin khud add kar raha hai to null rakh sakte hain ya admin ID
      items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image || '', // Agar image bheji hai to
          price: item.price,
          style: item.size, // Size store kar rahe hain
          product: item.productId // Optional: Agar Product ID bhi bhej rahe ho
      })),
      totalAmount: totalAmount || 0,
      
      // Manual Sale Info
      razorpayOrderId: `MANUAL_${Date.now()}`, 
      razorpayPaymentId: paymentId || 'CASH/UPI',
      status: 'Delivered', // Manual sale turant deliver maani jati hai
      paidAt: Date.now()
    });

    const savedOrder = await newOrder.save();
    
    res.status(201).json({ 
        message: 'Sale recorded & Stock Updated successfully', 
        order: savedOrder 
    });

  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ error: error.message || 'Error recording sale' });
  }
};

// --- 2. GET ALL SALES (Admin History) ---
export const getSales = async (req, res) => {
  try {
    const sales = await Order.find({}).sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: 'Error fetching sales history' });
  }
};