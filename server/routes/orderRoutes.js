import express from 'express';
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js'; 
import { 
    createOrder, 
    myOrders, 
    getLastOrderAddress,
    generateDeliveryOTP, 
    verifyDeliveryOTPAndDeliver, 
    updateOrderStatus 
} from '../controllers/orderController.js';

const router = express.Router();

// --- CUSTOMER ROUTES ---
// URL: /api/orders/new
router.post('/new', authenticateToken, createOrder);

// URL: /api/orders/myorders
router.get('/myorders', authenticateToken, myOrders);

// URL: /api/orders/last-address
router.get('/last-address', authenticateToken, getLastOrderAddress);


// --- ADMIN ROUTES (Updated Paths) ---



router.put('/admin/:id/generate-otp', authenticateToken, verifyAdmin, generateDeliveryOTP);

router.put('/admin/:id/verify-delivery', authenticateToken, verifyAdmin, verifyDeliveryOTPAndDeliver);

router.put('/admin/:id/status', authenticateToken, verifyAdmin, updateOrderStatus);

export default router;