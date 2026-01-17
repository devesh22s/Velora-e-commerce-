import Product from '../models/Product.js'; 

// 1. Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products from DB' });
  }
};

// 2. Add Product
export const addProduct = async (req, res) => {
  try {
    const { STYLE } = req.body;
    
    const productExists = await Product.findOne({ STYLE });
    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const product = await Product.create(req.body); 
    res.status(201).json(product);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: 'Error adding product' });
  }
};

// 3. DELETE Product (By Style Code)
export const deleteProduct = async (req, res) => {
    try {
        const { style } = req.params; 

        const deletedProduct = await Product.findOneAndDelete({ STYLE: style });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ 4. UPDATE Product (New Function for Edit Feature)
export const updateProduct = async (req, res) => {
    try {
        // Frontend ID bhej raha hai URL mein (/:id)
        const product = await Product.findById(req.params.id);

        if (product) {
            // Basic Fields Update
            product.STYLE_NAME = req.body.STYLE_NAME || product.STYLE_NAME;
            product.MRP = req.body.MRP || product.MRP;
            product.CATEGORY = req.body.CATEGORY || product.CATEGORY;
            product.BRAND = req.body.BRAND || product.BRAND;
            product.DESCRIPTION = req.body.DESCRIPTION || product.DESCRIPTION;

            // Update Variants (Stock Quantity change karne ke liye)
            if(req.body.VARIANTS) {
                product.VARIANTS = req.body.VARIANTS;
            }

            // Update Images (Agar nayi upload hui hain)
            if(req.body.IMAGES && req.body.IMAGES.length > 0) {
                product.IMAGES = req.body.IMAGES;
                product.IMAGE_URL = req.body.IMAGES[0]; // First image ko main banao
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: 'Server Error updating product' });
    }
};