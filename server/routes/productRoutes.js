import express from 'express';
import { getAllProducts, addProduct, deleteProduct } from '../controllers/productController.js'; // deleteProduct import karein
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js';
// Agar controller file alag nahi h to neeche inline logic use karein

const router = express.Router();

// 1. Get All Products (Public)
router.get('/', getAllProducts);

// 2. Add Product (Admin Only)
router.post('/', authenticateToken, verifyAdmin, addProduct);

// 3. DELETE Product (Admin Only) - NEW CODE
// Agar aapne controller me function nahi banaya, to ye inline code use karein:
router.delete('/:style', authenticateToken, verifyAdmin, async (req, res) => {
    try {
        // Yahan hum Mongoose Model ko direct access kar rahe hain assume karke
        // Agar aapne Product model import nahi kiya upar, to ensure karein: import Product from '../models/Product.js';
        const Product = (await import('../models/Product.js')).default; 
        
        const styleCode = req.params.style;
        const deletedProduct = await Product.findOneAndDelete({ STYLE: styleCode });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;