import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },

  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      quantity: Number,
      price: Number,
      image: String,
      style: String, 
      styleCode: String,
    }
  ],

  totalAmount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },

  status: { 
    type: String, 
    default: 'Ordered', 
    enum: ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'] 
  },

  deliveryOTP: { type: String }, // OTP store karne ke liye
  deliveryOTPExpire: { type: Date }, // Security ke liye expiry

  // --- NEW: PROFESSIONAL TIMELINE ---
  timeline: [
    {
      status: { type: String }, // e.g., "Ordered"
      message: { type: String }, // e.g., "Order placed successfully"
      timestamp: { type: Date, default: Date.now }
    }
  ],

  paidAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;