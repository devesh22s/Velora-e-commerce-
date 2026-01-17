import express from 'express';
import { addSale, getSales } from '../controllers/salesController.js';
import { verifyAdmin, authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- ADMIN ROUTES ---

// 1. Manual Sale Add (Admin Only)
router.post('/add', authenticateToken, verifyAdmin, addSale);

// 2. Get All Sales History (Admin Only)
router.get('/history', authenticateToken, verifyAdmin, getSales);

// ❌ NOTE: Maine yahan se '/myorders' hata diya hai kyunki wo 'orderRoutes' me hai.

export default router;