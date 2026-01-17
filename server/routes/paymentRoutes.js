import express from 'express';
import { checkout, paymentVerification } from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Security Layer

const router = express.Router();

// 1. Create Order (Secure Backend Price Calc)
router.post('/checkout', authenticateToken, checkout);

// 2. Verify Payment & Save Order (Stock Deduction)
router.post('/verify', authenticateToken, paymentVerification);

export default router;