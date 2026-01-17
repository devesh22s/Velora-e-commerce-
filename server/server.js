import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js' // <--- 1. IMPORT ADDED
import orderRoutes from './routes/orderRoutes.js'; // <--- Import karein

import adminRoutes from './routes/adminRoutes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'


dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3001


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Global Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://velora-e-commerce.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json())
app.use(helmet());

// Route Definitions
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/payment', paymentRoutes) // <--- 2. ROUTE ADDED
app.use('/api/orders', orderRoutes); // Customer Orders


// admin area
app.use('/api/admin', adminRoutes);
// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', mode: 'Modular MVC' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})