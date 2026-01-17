import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  LayoutDashboard, ShoppingBag, Mail, LogOut, Search, TrendingUp,
  DollarSign, Package, Phone, MapPin, X, Trash2, List, User, CreditCard, Lock, Edit, UploadCloud,
  IndianRupee
} from "lucide-react"; 
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import API_URL from "../config";
import "./AdminDashboard.css"; // Ensure Enhanced CSS is imported

function AdminDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // --- STATES ---
  const [stats, setStats] = useState({ totalRevenue: 0, totalSales: 0 });
  const [salesData, setSalesData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  // --- OTP & EDIT STATES ---
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  
  // ✅ Edit State for Images (Mix of Strings & Files)
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImages, setEditImages] = useState([]); 
  const [isUpdating, setIsUpdating] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 403) {
          toast.error("Access Denied");
          navigate("/customer");
          return;
        }
        const data = await res.json();
        setStats(data.stats || { totalRevenue: 0, totalSales: 0 });
        setOrders(Array.isArray(data.recentOrders) ? data.recentOrders : []);
        setSalesData(Array.isArray(data.salesData) ? data.salesData : []);
        setUnreadCount(data.unreadMessages || 0);
      } catch (error) { console.error(error); }
    };
    if (token) fetchData();
  }, [token, navigate]);

  useEffect(() => {
    if (activeTab === "messages") {
      fetch(`${API_URL}/api/admin/messages`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json()).then((data) => setMessages(Array.isArray(data) ? data : []));
    }
    if (activeTab === "products") {
      fetch(`${API_URL}/api/products`).then((res) => res.json()).then((data) => setProducts(Array.isArray(data) ? data : []));
    }
  }, [activeTab, token]);

  // --- DELETE PRODUCT ---
  const handleDeleteProduct = async (styleCode) => {
    if (!window.confirm(`Delete product ${styleCode}?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${styleCode}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Product Deleted");
        setProducts(products.filter((p) => p.STYLE !== styleCode));
      } else { toast.error("Failed to delete"); }
    } catch (error) { toast.error("Server Error"); }
  };

  // --- EDIT PRODUCT LOGIC (FIXED FOR 4 IMAGES) ---
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      ...product,
      MRP: product.MRP,
      VARIANTS: product.VARIANTS || []
    });
    // Load existing images (URLs) into state
    setEditImages(product.IMAGES || [product.IMAGE_URL]); 
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    if (field === 'STOCK_QTY' && value < 0) return;
    const updatedVariants = [...editForm.VARIANTS];
    updatedVariants[index][field] = value;
    setEditForm({ ...editForm, VARIANTS: updatedVariants });
  };

  // Handle Image Selection (Mix of old and new)
  const handleEditImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (editImages.length + files.length > 4) {
      return toast.error("Max 4 images allowed.");
    }
    setEditImages([...editImages, ...files]); // Add new files to existing array
  };

  // Remove Image (Works for both URL and File)
  const handleRemoveEditImage = (index) => {
    const updated = editImages.filter((_, i) => i !== index);
    setEditImages(updated);
  };

  const handleUpdateSubmit = async () => {
    setIsUpdating(true);
    try {
        let finalImageUrls = [];
        
        // Loop through images: Upload files, keep URLs
        for (const item of editImages) {
            if (typeof item === 'string') {
                // If it's already a URL, keep it
                finalImageUrls.push(item);
            } else {
                // If it's a new File, upload to Cloudinary
                const data = new FormData();
                data.append("file", item);
                data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
                data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
                
                const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
                    method: "POST", body: data
                });
                const cloudData = await res.json();
                finalImageUrls.push(cloudData.secure_url);
            }
        }

        const updatedData = { 
            ...editForm, 
            IMAGES: finalImageUrls, 
            IMAGE_URL: finalImageUrls[0] || editForm.IMAGE_URL // First image is main
        };
        
        const res = await fetch(`${API_URL}/api/products/${editingProduct._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(updatedData)
        });

        if (res.ok) {
            const result = await res.json();
            toast.success("Product Updated!");
            setProducts(products.map(p => p._id === result._id ? result : p));
            setEditingProduct(null);
        } else {
            toast.error("Failed to update");
        }
    } catch (error) {
        console.error(error);
        toast.error("Error updating product");
    } finally {
        setIsUpdating(false);
    }
  };

  // --- ORDER STATUS & OTP LOGIC ---
  const handleStatusChangeRequest = async (orderId, newStatus) => {
    if (newStatus === "Delivered") {
        if(!window.confirm("Send OTP to customer?")) return;
        try {
            const res = await fetch(`${API_URL}/api/orders/admin/${orderId}/generate-otp`, {
                method: 'PUT', headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if(data.success) { toast.info("OTP Sent"); setShowOtpModal(true); } 
            else { toast.error(data.message); }
        } catch (err) { toast.error("Server Error"); }
        return;
    }
    updateStatusDirectly(orderId, newStatus);
  };

  const updateStatusDirectly = async (orderId, newStatus) => {
    try {
        const res = await fetch(`${API_URL}/api/orders/admin/${orderId}/status`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus })
        });
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(o => o._id === orderId ? updatedOrder : o));
        setSelectedOrder(updatedOrder);
        toast.success(`Status: ${newStatus}`);
    } catch (error) { toast.error("Update failed"); }
  };

  const handleVerifyOtp = async () => {
    if(otpInput.length < 6) return toast.error("Invalid OTP");
    setOtpLoading(true);
    try {
        const res = await fetch(`${API_URL}/api/orders/admin/${selectedOrder._id}/verify-delivery`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ otp: otpInput })
        });
        const data = await res.json();
        if(data.success) {
            toast.success("Verified!");
            setOrders(prev => prev.map(o => o._id === selectedOrder._id ? data.order : o));
            setSelectedOrder(data.order);
            setShowOtpModal(false); setOtpInput("");
        } else { toast.error("Invalid OTP"); }
    } catch (err) { toast.error("Error"); } finally { setOtpLoading(false); }
  };

  const filteredProducts = products.filter((p) => 
    p.STYLE_NAME?.toLowerCase().includes(productSearch.toLowerCase()) || p.STYLE?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo-area"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">V</div>Velora Admin</div>
        <nav className="nav-links">
          <div className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}><ShoppingBag size={20} /> Orders</div>
          <div className={`nav-item ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}><List size={20} /> Products</div>
          <div className={`nav-item ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
             <div className="flex justify-between w-full items-center"><span className="flex gap-3"><Mail size={20} /> Inbox</span>{unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 rounded-full">{unreadCount}</span>}</div>
          </div>
          <Link to="/admin/add-product" className="nav-item"><TrendingUp size={20} /> Add Product</Link>
        </nav>
        <div style={{ marginTop: "auto" }}><div className="nav-item" onClick={() => { logout(); navigate("/login"); }}><LogOut size={20} /> Logout</div></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Overview</h1>
            <div className="stats-grid-3">
              <div className="stat-card-pro"><div className="icon bg-green-100 text-green-600"><IndianRupee /></div><div><p className="label">Revenue</p><h3>₹{stats?.totalRevenue?.toLocaleString()}</h3></div></div>
              <div className="stat-card-pro"><div className="icon bg-blue-100 text-blue-600"><Package /></div><div><p className="label">Orders</p><h3>{stats?.totalSales}</h3></div></div>
              <div className="stat-card-pro"><div className="icon bg-purple-100 text-purple-600"><Mail /></div><div><p className="label">Inbox</p><h3>{unreadCount} New</h3></div></div>
            </div>
            <div className="chart-container mt-8"><ResponsiveContainer width="100%" height={320}><AreaChart data={salesData}><XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Area type="monotone" dataKey="sales" stroke="#2563eb" fill="#eff6ff" /></AreaChart></ResponsiveContainer></div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-view">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Recent Orders</h1>
            <div className="order-table-container">
              <table className="admin-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>{orders.map((order) => (<tr key={order._id} onClick={() => setSelectedOrder(order)}>
                  <td className="font-mono text-gray-600">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                  <td>{order.customerName}</td><td>{new Date(order.createdAt).toLocaleDateString()}</td><td className="font-bold">₹{order.totalAmount}</td>
                  <td><span className={`status-badge status-${order.status.toLowerCase().replace(/\s/g, '')}`}>{order.status}</span></td>
                </tr>))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ✅ FIXED SEARCH BAR & PRODUCTS */}
        {activeTab === "products" && (
          <div className="products-view">
            <div className="top-header">
                <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
                <div className="search-wrapper">
                    <Search size={18} color="#9ca3af" />
                    <input type="text" placeholder="Search products..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className="search-input" />
                </div>
            </div>
            <div className="order-table-container">
              <table className="admin-table">
                <thead><tr><th>Image</th><th>Code</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
                <tbody>{filteredProducts.map((p) => {
                    const totalStock = p.VARIANTS ? p.VARIANTS.reduce((sum, v) => sum + v.STOCK_QTY, 0) : 0;
                    return (<tr key={p._id}>
                        <td><img src={p.IMAGE_URL} className="table-img" alt="" /></td><td className="font-mono text-xs">{p.STYLE}</td><td className="font-semibold">{p.STYLE_NAME}</td><td>{p.CATEGORY}</td><td>₹{p.MRP}</td>
                        <td><span className={`status-badge ${totalStock < 5 ? 'status-cancelled' : 'status-delivered'}`}>{totalStock}</span></td>
                        <td><div className="action-buttons"><button onClick={() => handleEditClick(p)} className="action-btn edit"><Edit size={16} /></button><button onClick={() => handleDeleteProduct(p.STYLE)} className="action-btn delete"><Trash2 size={16} /></button></div></td>
                    </tr>)
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ✅ FIXED INBOX STYLING */}
        {activeTab === "messages" && (
            <div className="messages-view">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Inbox</h1>
                <div className="messages-grid">
                    {messages.map(msg => (
                        <div key={msg._id} className="message-card">
                            <div className="msg-header">
                                <span className="msg-name">{msg.name}</span>
                                <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="msg-subject">{msg.subject}</div>
                            <div className="msg-body">{msg.message}</div>
                            <span className="msg-email">{msg.email}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* --- ✅ DETAILED ORDER PANEL (FIXED) --- */}
      {selectedOrder && activeTab === "orders" && (
        <div className="details-panel">
          <div className="panel-header">
             <div>
                 <h2>Order #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}</h2>
                 <span>Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</span>
             </div>
             <button className="close-btn" onClick={() => setSelectedOrder(null)}><X size={24} /></button>
          </div>
          
          <div className="panel-content">
            {/* Customer Section */}
            <div className="section-title"><User size={16}/> Customer Details</div>
            <div className="info-box">
                <div className="user-row">
                    <div className="avatar-circle">{selectedOrder.customerName?.charAt(0).toUpperCase()}</div>
                    <div className="user-details">
                        <h4>{selectedOrder.customerName}</h4>
                        <span>{selectedOrder.email}</span>
                        <span>{selectedOrder.shippingInfo?.phone}</span>
                    </div>
                </div>
                {selectedOrder.shippingInfo && (
                    <div className="address-text">
                        <strong>Shipping To:</strong><br/>
                        {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.locality}<br/>
                        {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} - <b>{selectedOrder.shippingInfo.pincode}</b>
                    </div>
                )}
            </div>

            {/* Payment Section (New) */}
            <div className="section-title"><CreditCard size={16}/> Payment Info</div>
            <div className="payment-grid">
                <div className="pay-item">
                    <span className="pay-label">Total Amount</span>
                    <span className="pay-val text-green-600">₹{selectedOrder.totalAmount}</span>
                </div>
                <div className="pay-item">
                    <span className="pay-label">Payment ID</span>
                    <span className="pay-val">{selectedOrder.razorpayPaymentId || "N/A"}</span>
                </div>
                <div className="pay-item">
                    <span className="pay-label">Order ID (Rzp)</span>
                    <span className="pay-val">{selectedOrder.razorpayOrderId || "N/A"}</span>
                </div>
                <div className={`pay-item ${!selectedOrder.paidAt ? 'pending' : ''}`}>
                    <span className="pay-label">Payment Status</span>
                    <span className="pay-val">{selectedOrder.paidAt ? "Paid" : "Pending"}</span>
                </div>
            </div>

            {/* Items Section */}
            <div className="section-title"><Package size={16}/> Items ({selectedOrder.items?.length})</div>
            {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="item-row">
                    <img src={item.image} alt="prod" className="item-thumb"/>
                    <div className="item-details">
                        <p className="item-title">{item.name}</p>
                        <p className="item-meta">Size: {item.style} | Qty: {item.quantity}</p>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="panel-footer">
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Order Status</label>
            <select className="status-select" value={selectedOrder.status} onChange={(e) => handleStatusChangeRequest(selectedOrder._id, e.target.value)}>
                <option value="Ordered">Ordered</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered (Verify OTP)</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      )}

      {/* --- OTP & EDIT MODALS --- */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
           <div className="otp-modal">
               <div className="modal-icon"><Lock size={32}/></div><h3>Verify Delivery</h3>
               <input type="text" placeholder="Enter OTP" value={otpInput} maxLength={6} onChange={(e) => setOtpInput(e.target.value)} className="otp-input"/>
               <div className="modal-actions"><button className="cancel-btn" onClick={() => setShowOtpModal(false)}>Cancel</button><button className="verify-btn" onClick={handleVerifyOtp} disabled={otpLoading}>Verify</button></div>
           </div>
        </div>
      )}

      {/* Edit Modal (Logic Fixed for Mixed Images) */}
      {editingProduct && (
        <div className="otp-modal-overlay">
            <div className="edit-modal-content">
                <button className="close-modal-btn" onClick={() => setEditingProduct(null)}><X size={24}/></button>
                <h2 className="edit-modal-title">Edit Product</h2>
                <div className="form-group"><label className="form-label">Name</label><input type="text" name="STYLE_NAME" value={editForm.STYLE_NAME} onChange={handleEditChange} className="form-input"/></div>
                <div className="form-group"><label className="form-label">Price</label><input type="number" name="MRP" value={editForm.MRP} onChange={handleEditChange} className="form-input"/></div>
                <div className="form-group"><label className="form-label">Variants (Stock)</label>
                    <div className="variants-container">
                        {editForm.VARIANTS?.map((v, i) => (
                            <div key={i} className="variant-row"><span className="variant-label">{v.AGE}</span><input type="number" min="0" value={v.STOCK_QTY} onChange={(e) => handleVariantChange(i, 'STOCK_QTY', e.target.value)} className="variant-input" /></div>
                        ))}
                    </div>
                </div>
                <div className="form-group"><label className="form-label">Images ({editImages.length}/4)</label>
                    <div className="image-grid">
                        {/* Display existing URL or new File preview */}
                        {editImages.map((img, i) => (
                            <div key={i} className="image-preview-box">
                                <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt="prev" />
                                <button className="remove-img-btn" onClick={() => handleRemoveEditImage(i)}><X size={10}/></button>
                            </div>
                        ))}
                        {editImages.length < 4 && (<label className="upload-box" style={{width:'70px', height:'70px', padding:0}}><input type="file" multiple accept="image/*" onChange={handleEditImageSelect} hidden /><UploadCloud size={20}/></label>)}
                    </div>
                </div>
                <button onClick={handleUpdateSubmit} disabled={isUpdating} className="save-btn">{isUpdating ? "Saving..." : "Save Changes"}</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;