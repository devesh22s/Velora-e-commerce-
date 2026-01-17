import express from 'express';
// ✅ updateProduct ko import karein
import { getAllProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js'; 
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Get All Products (Public)
router.get('/', getAllProducts);

// 2. Add Product (Admin Only)
router.post('/', authenticateToken, verifyAdmin, addProduct);

// 3. DELETE Product (Admin Only) - Uses Style Code (e.g., NLS001)
router.delete('/:style', authenticateToken, verifyAdmin, deleteProduct);

// ✅ 4. UPDATE Product (Admin Only) - Uses MongoDB ID (e.g., 65a4...)
router.put('/:id', authenticateToken, verifyAdmin, updateProduct);

export default router;