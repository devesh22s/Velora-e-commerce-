import express from 'express';
import { 
    getAdminDashboardData, 
    updateOrderStatus, 
    contactAdmin, 
    getMessages 
} from '../controllers/adminController.js';
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// --- ADMIN ROUTES ---

// 1. Dashboard Data (Stats + Recent Orders with Details)
router.get('/dashboard', authenticateToken, verifyAdmin, getAdminDashboardData);

// 2. Update Order Status
router.put('/orders/:orderId/status', authenticateToken, verifyAdmin, updateOrderStatus);

// 3. Admin Inbox
router.get('/messages', authenticateToken, verifyAdmin, getMessages);

// --- PUBLIC/CUSTOMER ROUTES (Inside Admin Namespace for grouping) ---

// 4. Customer Contact Form
router.post('/contact', authenticateToken, contactAdmin);

export default router;