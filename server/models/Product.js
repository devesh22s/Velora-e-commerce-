import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  SKU_CODE: String,
  SKU_ID: String,
  SELLER_SKU: String,
  AGE: String,
  STOCK_QTY: Number,
  STATUS: String
});

const productSchema = new mongoose.Schema({
  STYLE: { type: String, unique: true, required: true }, // Unique ID
  STYLE_NAME: { type: String, required: true },
  BRAND: String,
  MRP: Number,
  GENDER: String,
  CATEGORY: String,
  IMAGE_URL: { type: String, required: true }, // Main Image
    IMAGES: [{ type: String }],
    DESCRIPTION: { type: String },
  VARIANTS: [variantSchema] // Array of variants
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;