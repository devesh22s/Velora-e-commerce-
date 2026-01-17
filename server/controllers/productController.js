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
    
    // Check Duplicate
    const productExists = await Product.findOne({ STYLE });
    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    // Yahan req.body se sara naya data (IMAGES, DESCRIPTION) apne aap save ho jayega
    // agar aapke Product Schema mein wo fields defined hain.
    const product = await Product.create(req.body); 
    res.status(201).json(product);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: 'Error adding product' });
  }
};

// 3. DELETE Product (Ye Naya Function Hai - Isse Error Jayega)
export const deleteProduct = async (req, res) => {
    try {
        const { style } = req.params; // Router se style code milega (/:style)

        // Database se dhoondo aur delete karo
        const deletedProduct = await Product.findOneAndDelete({ STYLE: style });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};