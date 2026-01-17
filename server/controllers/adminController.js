import Order from '../models/Order.js';
import Message from '../models/Message.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

// --- 1. GET DASHBOARD DATA (Stats + Full Orders + Graph) ---
export const getAdminDashboardData = async (req, res) => {
  try {
    // A. Stats (Total Revenue & Sales)
    const statsData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: { $sum: 1 }
        }
      }
    ]);

    const stats = statsData.length > 0 ? statsData[0] : { totalRevenue: 0, totalSales: 0 };

    // B. Recent Orders (CRITICAL FIX HERE)
    // Humne '.select()' hata diya hai taaki Shipping Info, Items, Phone sab frontend pe jaye
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 }) // Latest first
      .limit(20); // Top 20 orders dikhayenge taaki list bhari hui lage
    
    // C. Unread Messages
    const unreadMessages = await Message.countDocuments({ read: false }).catch(() => 0);

    // D. Sales Graph Data (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            sales: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      stats,
      recentOrders, // ✅ Ab isme Shipping Info aur Items bhi honge
      unreadMessages,
      salesData
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// --- 2. UPDATE ORDER STATUS (WITH TIMELINE) ---
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, message } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 1. Status Update
    order.status = status;

    // 2. Timeline Entry (Professional Tracking)
    order.timeline.push({
      status: status,
      message: message || `Order status updated to ${status}`,
      timestamp: Date.now()
    });

    await order.save();

    res.status(200).json(order); // Returns updated full object
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

// --- 3. GET MESSAGES (Inbox) ---
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

// --- 4. SEND MESSAGE (Contact Form) ---
export const contactAdmin = async (req, res) => {
  const { subject, message, name, email } = req.body;
  const userId = req.user ? req.user.id : null; 

  try {
    const newMessage = new Message({ userId, name, email, subject, message });
    await newMessage.save();

    // Optional: Email Notification to Admin
    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, 
        replyTo: email,
        subject: `Support Request: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };
        await transporter.sendMail(mailOptions);
    }

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};