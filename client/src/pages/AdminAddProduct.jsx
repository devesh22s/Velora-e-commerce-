import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { 
  Plus, Trash2, UploadCloud, Save, X,
  LayoutDashboard, ShoppingBag, LogOut, ArrowLeft, Image as ImageIcon
} from 'lucide-react';
import API_URL from '../config'; 

import './AdminDashboard.css'; 
import './AdminAddProduct.css'; 

function AdminAddProduct() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [imageFiles, setImageFiles] = useState([]); 
  const [previews, setPreviews] = useState([]);     

  const predefinedBrands = ["Lilly and Sid", "Little Bird", "Frugi", "Next", "H&M"];
  const predefinedCategories = ["Tops", "Trousers", "Dungaree", "Sets", "Dresses", "Jackets"];

  // --- STATE UPDATE: DESCRIPTION ADDED ---
  const [formData, setFormData] = useState({
    STYLE: '', STYLE_NAME: '', 
    DESCRIPTION: '', // <--- NEW FIELD
    BRAND: '', 
    MRP: '',
    GENDER: 'Boy', 
    CATEGORY: '', 
    IMAGE_URL: '', 
    IMAGES: [],    
    VARIANTS: []
  });

  const [variantInput, setVariantInput] = useState({
    SKU_CODE: '', AGE: '', STOCK_QTY: ''
  });

  // --- Handlers (Image & Variants) ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 4) {
      toast.error("You can only upload a maximum of 4 images.");
      return;
    }
    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviews(newPreviews);
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedUrls = [];
    for (const file of imageFiles) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); 
        data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
                method: "POST", body: data
            });
            const cloudData = await res.json();
            uploadedUrls.push(cloudData.secure_url);
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error("One or more images failed to upload");
        }
    }
    return uploadedUrls;
  };

  const addVariant = () => {
    if (!variantInput.SKU_CODE || !variantInput.AGE || variantInput.STOCK_QTY === '') {
      toast.error("Fill all variant details"); return;
    }
    const stockValue = parseInt(variantInput.STOCK_QTY);
    if (stockValue < 0) { toast.error("Stock Quantity cannot be negative!"); return; }

    const newVariant = {
      ...variantInput,
      STOCK_QTY: stockValue,
      STATUS: stockValue > 0 ? 'In Stock' : 'Out of Stock',
      SKU_ID: Math.floor(Math.random() * 100000000).toString(),
      SELLER_SKU: `${formData.STYLE}-${variantInput.AGE}`
    };
    setFormData({ ...formData, VARIANTS: [...formData.VARIANTS, newVariant] });
    setVariantInput({ SKU_CODE: '', AGE: '', STOCK_QTY: '' });
  };

  const removeVariant = (index) => {
    const updated = formData.VARIANTS.filter((_, i) => i !== index);
    setFormData({ ...formData, VARIANTS: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) { toast.error("Please select at least 1 image."); return; }
    if (!formData.BRAND) { toast.error("Please enter or select a Brand."); return; }
    if (!formData.CATEGORY) { toast.error("Please enter or select a Category."); return; }
    if (parseFloat(formData.MRP) < 0) { toast.error("MRP cannot be negative"); return; }

    setLoading(true);
    try {
      const imageUrls = await uploadImagesToCloudinary();
      if (imageUrls.length === 0) throw new Error("Image upload failed");

      const finalProductData = {
          ...formData,
          IMAGE_URL: imageUrls[0], 
          IMAGES: imageUrls,       
          MRP: parseFloat(formData.MRP)
      };

      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(finalProductData)
      });
      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product Published Successfully!");
      setFormData({ 
          STYLE: '', STYLE_NAME: '', DESCRIPTION: '', // Reset Description too
          BRAND: '', MRP: '', GENDER: 'Boy', CATEGORY: '', IMAGE_URL: '', IMAGES: [], VARIANTS: [] 
      });
      setPreviews([]); setImageFiles([]);

    } catch (error) { toast.error(error.message); } 
    finally { setLoading(false); }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="logo-area">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
          <span className="text-white font-bold text-xl">Velora</span>
        </div>
        <nav className="nav-links">
          <Link to="/admin/orders" className="nav-item">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <div className="nav-item active">
            <ShoppingBag size={20} /> Add Products
          </div>
        </nav>
        <div style={{marginTop: 'auto'}}>
            <div className="nav-item" onClick={handleLogout}><LogOut size={20} /> Logout</div>
        </div>
      </div>

      <div className="main-content bg-gray-50">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            <Link to="/admin/orders" className="text-gray-500 hover:text-gray-800 flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>
        </div>

        <form onSubmit={handleSubmit} className="product-form-layout">
          <div className="form-left">
            <div className="form-card">
              <h3 className="card-title">Basic Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Style Code</label>
                  <input type="text" required className="form-input" 
                    value={formData.STYLE} onChange={e => setFormData({...formData, STYLE: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" required className="form-input" 
                    value={formData.STYLE_NAME} onChange={e => setFormData({...formData, STYLE_NAME: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Brand Name</label>
                  <input type="text" list="brand-list" placeholder="Search or Type New Brand" className="form-input"
                    value={formData.BRAND} onChange={e => setFormData({...formData, BRAND: e.target.value})} />
                  <datalist id="brand-list">
                    {predefinedBrands.map((brand, i) => <option key={i} value={brand} />)}
                  </datalist>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" list="category-list" placeholder="Search or Type New Category" className="form-input"
                    value={formData.CATEGORY} onChange={e => setFormData({...formData, CATEGORY: e.target.value})} />
                  <datalist id="category-list">
                    {predefinedCategories.map((cat, i) => <option key={i} value={cat} />)}
                  </datalist>
                </div>
                <div className="form-group">
                  <label>MRP (₹)</label>
                  <input type="number" min="0" required className="form-input" 
                    value={formData.MRP} onChange={e => setFormData({...formData, MRP: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-select" value={formData.GENDER} onChange={e => setFormData({...formData, GENDER: e.target.value})}>
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                {/* --- NEW DESCRIPTION FIELD --- */}
                <div className="form-group" style={{gridColumn: '1 / -1'}}> {/* Full Width */}
                    <label>Product Description</label>
                    <textarea 
                        className="form-input" 
                        rows="4"
                        placeholder="Enter material, wash care details, or product features..."
                        value={formData.DESCRIPTION}
                        onChange={e => setFormData({...formData, DESCRIPTION: e.target.value})}
                    ></textarea>
                </div>

              </div>
            </div>

            <div className="form-card">
              <h3 className="card-title">Inventory & Variants</h3>
              <div className="variant-input-row">
                <input type="text" placeholder="SKU" className="form-input" style={{flex:2}}
                  value={variantInput.SKU_CODE} onChange={e => setVariantInput({...variantInput, SKU_CODE: e.target.value})} />
                <input type="text" placeholder="Size (e.g. 2-3Y)" className="form-input" style={{flex:2}}
                  value={variantInput.AGE} onChange={e => setVariantInput({...variantInput, AGE: e.target.value})} />
                <input type="number" min="0" placeholder="Qty" className="form-input" style={{flex:1}}
                  value={variantInput.STOCK_QTY} onChange={e => setVariantInput({...variantInput, STOCK_QTY: e.target.value})} />
                <button type="button" onClick={addVariant} className="add-variant-btn"><Plus size={20}/></button>
              </div>

              {formData.VARIANTS.length > 0 && (
                <div className="variant-table-container">
                  <table className="variant-table">
                    <thead>
                      <tr><th>SKU</th><th>Size</th><th>Stock</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {formData.VARIANTS.map((v, i) => (
                        <tr key={i}>
                          <td>{v.SKU_CODE}</td>
                          <td>{v.AGE}</td>
                          <td>{v.STOCK_QTY}</td>
                          <td>
                            <button type="button" onClick={() => removeVariant(i)} className="delete-btn"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="form-right">
            <div className="form-card sticky top-6">
              <h3 className="card-title">Product Images (Max 4)</h3>
              <div className="image-grid">
                {previews.map((src, index) => (
                    <div key={index} className="image-preview-box">
                        <img src={src} alt={`preview ${index}`} />
                        <button type="button" onClick={() => removeImage(index)} className="remove-img-btn"><X size={14} /></button>
                        {index === 0 && <span className="main-tag">Main</span>}
                    </div>
                ))}
                {previews.length < 4 && (
                    <label className="upload-placeholder-box">
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
                        <ImageIcon size={24} className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Add Image</span>
                    </label>
                )}
              </div>
              <div className="mt-4 text-xs text-gray-500">* First image will be the main display image.</div>
              <button type="submit" disabled={loading} className="publish-btn mt-6">
                {loading ? 'Uploading & Saving...' : <><Save size={20}/> Publish Product</>}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;