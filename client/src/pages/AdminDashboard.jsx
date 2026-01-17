import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  LayoutDashboard, ShoppingBag, Mail, LogOut, Search, TrendingUp,
  DollarSign, Package, Phone, MapPin, X, Trash2, List, User, CreditCard, Lock
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import API_URL from "../config";
import "./AdminDashboard.css";

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

  // --- OTP MODAL STATES ---
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // --- FETCH DASHBOARD DATA ---
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
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };
    if (token) fetchData();
  }, [token, navigate]);

  // --- FETCH MESSAGES & PRODUCTS ---
  useEffect(() => {
    if (activeTab === "messages") {
      fetch(`${API_URL}/api/admin/messages`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json()).then((data) => setMessages(Array.isArray(data) ? data : []));
    }
    if (activeTab === "products") {
      fetch(`${API_URL}/api/products`).then((res) => res.json()).then((data) => setProducts(Array.isArray(data) ? data : []));
    }
  }, [activeTab, token]);

  // --- PRODUCT ACTIONS ---
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

  // --- ORDER STATUS LOGIC (SECURE FLOW) ---

  // 1. Initial Request Handler
const handleStatusChangeRequest = async (orderId, newStatus) => {
    if (newStatus === "Delivered") {
        if(!window.confirm("This will trigger an OTP email to the customer. Proceed?")) return;
        
        try {
            // ✅ UPDATE URL HERE: '/api/admin/orders' -> '/api/orders/admin'
            const res = await fetch(`${API_URL}/api/orders/admin/${orderId}/generate-otp`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if(data.success) {
                toast.info("OTP Sent to Customer Email");
                setShowOtpModal(true); // Open Verification Modal
            } else {
                toast.error(data.message || "Failed to send OTP");
            }
        } catch (err) {
            toast.error("Server Error sending OTP");
        }
        return; // Wait for OTP verification
    }

    // B. Normal Status Flow (Shipped, Out for Delivery, etc.)
    updateStatusDirectly(orderId, newStatus);
  };

  // 2. Direct Update Helper
const updateStatusDirectly = async (orderId, newStatus) => {
    const message = prompt(`Tracking Note for ${newStatus} (Optional):`, `Order is ${newStatus}`);
    try {
        // ✅ UPDATE URL HERE
        const res = await fetch(`${API_URL}/api/orders/admin/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus, message: message })
        });
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(o => o._id === orderId ? updatedOrder : o));
        setSelectedOrder(updatedOrder);
        toast.success(`Status updated to ${newStatus}`);
    } catch (error) { toast.error("Update failed"); }
  };

  // 3. Verify OTP Helper
 const handleVerifyOtp = async () => {
    if(!otpInput || otpInput.length < 6) return toast.error("Enter valid 6-digit OTP");
    setOtpLoading(true);

    try {
        // ✅ UPDATE URL HERE
        const res = await fetch(`${API_URL}/api/orders/admin/${selectedOrder._id}/verify-delivery`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ otp: otpInput })
        });
        const data = await res.json();

        if(data.success) {
            toast.success("OTP Verified! Order Delivered Successfully.");
            setOrders(prev => prev.map(o => o._id === selectedOrder._id ? data.order : o));
            setSelectedOrder(data.order);
            setShowOtpModal(false);
            setOtpInput("");
        } else {
            toast.error(data.message || "Invalid or Expired OTP");
        }
    } catch (err) {
        toast.error("Verification Connection Error");
    } finally {
        setOtpLoading(false);
    }
  };

  const filteredProducts = (Array.isArray(products) ? products : []).filter((p) => 
    p.STYLE_NAME?.toLowerCase().includes(productSearch.toLowerCase()) || p.STYLE?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* --- SIDEBAR --- */}
      <div className="sidebar">
        <div className="logo-area">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
          <span>Velora Admin</span>
        </div>
        <nav className="nav-links">
          <div className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}><ShoppingBag size={20} /> Orders</div>
          <div className={`nav-item ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}><List size={20} /> Products</div>
          <div className={`nav-item ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
            <div className="flex justify-between w-full items-center">
              <span className="flex gap-3 items-center"><Mail size={20} /> Inbox</span>
              {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </div>
          </div>
          <Link to="/admin/add-product" className="nav-item"><TrendingUp size={20} /> Add Product</Link>
        </nav>
        <div style={{ marginTop: "auto" }}><div className="nav-item" onClick={() => { logout(); navigate("/login"); }}><LogOut size={20} /> Logout</div></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        
        {/* DASHBOARD VIEW */}
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Overview</h1>
            <div className="stats-grid-3">
              <div className="stat-card-pro"><div className="icon bg-green-100 text-green-600"><DollarSign /></div><div><p className="label">Revenue</p><h3>₹{stats?.totalRevenue?.toLocaleString()}</h3></div></div>
              <div className="stat-card-pro"><div className="icon bg-blue-100 text-blue-600"><Package /></div><div><p className="label">Orders</p><h3>{stats?.totalSales}</h3></div></div>
              <div className="stat-card-pro"><div className="icon bg-purple-100 text-purple-600"><Mail /></div><div><p className="label">Inbox</p><h3>{unreadCount} New</h3></div></div>
            </div>
            <div className="chart-container mt-8">
              <div className="chart-header"><h3 className="text-lg font-bold text-gray-700">Sales Trend</h3></div>
              <div style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs><linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
                    <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#2563eb" fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS VIEW */}
        {activeTab === "orders" && (
          <div className="orders-view">
            <div className="top-header">
                <h1 className="text-2xl font-bold">Recent Orders</h1>
            </div>
            <div className="order-table-container">
              <table className="admin-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} onClick={() => setSelectedOrder(order)} className={selectedOrder?._id === order._id ? "selected-row" : ""}>
                      <td className="font-mono">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                      <td>{order.customerName}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="font-bold">₹{order.totalAmount}</td>
                      <td><span className={`status-badge status-${order.status.toLowerCase().replace(/\s/g, '')}`}>{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS VIEW */}
        {activeTab === "products" && (
          <div className="products-view">
            <div className="top-header"><h1 className="text-2xl font-bold">Inventory</h1><div className="search-bar"><Search size={18} color="#9ca3af" /><input type="text" placeholder="Search..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} /></div></div>
            <div className="order-table-container">
              <table className="admin-table">
                <thead><tr><th>Image</th><th>Code</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
                <tbody>
                  {filteredProducts.map((p) => {
                    const totalStock = p.VARIANTS ? p.VARIANTS.reduce((sum, v) => sum + v.STOCK_QTY, 0) : 0;
                    return (
                      <tr key={p._id}>
                        <td><img src={p.IMAGE_URL} className="table-img" alt="" /></td>
                        <td className="font-mono text-xs text-gray-500">{p.STYLE}</td>
                        <td className="font-semibold">{p.STYLE_NAME}</td>
                        <td>{p.CATEGORY}</td>
                        <td>₹{p.MRP}</td>
                        <td><span className={`status-badge ${totalStock < 5 ? 'status-cancelled' : 'status-delivered'}`}>{totalStock}</span></td>
                        <td><button onClick={() => handleDeleteProduct(p.STYLE)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={16} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MESSAGES VIEW */}
        {activeTab === "messages" && (
            <div className="messages-view">
                <h1>Inbox</h1>
                {messages.map(msg => (
                    <div key={msg._id} className="message-item bg-white p-4 mb-2 rounded shadow-sm border">
                        <div className="font-bold flex justify-between">{msg.name} <span className="text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleDateString()}</span></div>
                        <div className="text-blue-600 text-sm mb-1">{msg.subject}</div>
                        <div className="text-gray-600 text-sm">{msg.message}</div>
                        <div className="text-xs text-gray-400 mt-2">{msg.email}</div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* --- RIGHT PANEL (ORDER DETAILS) --- */}
      {selectedOrder && activeTab === "orders" && (
        <div className="details-panel">
          <div className="panel-header">
            <div>
                <h2>Order #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}</h2>
                <span className="text-xs text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
            </div>
            <button className="close-btn" onClick={() => setSelectedOrder(null)}><X size={20} /></button>
          </div>
          
          <div className="panel-content">
            
            {/* 1. Customer & Address */}
            <div className="detail-card">
                <div className="card-title"><User size={14} /> Customer Information</div>
                <div className="customer-info-grid">
                    <div className="customer-avatar">{selectedOrder.customerName?.charAt(0).toUpperCase()}</div>
                    <div className="customer-text">
                        <h3>{selectedOrder.customerName}</h3>
                        <p><Mail size={12}/> {selectedOrder.email}</p>
                        <p><Phone size={12}/> {selectedOrder.shippingInfo?.phone || "N/A"}</p>
                        {selectedOrder.shippingInfo?.alternatePhone && (
                            <p className="text-xs text-gray-500">Alt Phone: {selectedOrder.shippingInfo.alternatePhone}</p>
                        )}
                    </div>
                </div>
                
                {/* Detailed Address Block */}
                <div className="shipping-details mt-4 p-3 bg-gray-50 rounded text-sm border border-gray-100">
                    <div className="font-bold text-gray-700 flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-blue-600" /> Shipping Address 
                        <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-auto">
                            {selectedOrder.shippingInfo?.addressType || 'Home'}
                        </span>
                    </div>
                    
                    <p className="mb-1 text-gray-800">{selectedOrder.shippingInfo?.address || "No Street Address"}</p>
                    {selectedOrder.shippingInfo?.locality && <p className="mb-1 text-gray-600">{selectedOrder.shippingInfo.locality}</p>}
                    {selectedOrder.shippingInfo?.landmark && <p className="mb-1 text-gray-500 text-xs">Landmark: {selectedOrder.shippingInfo.landmark}</p>}
                    
                    <div className="font-semibold text-gray-700 mt-2">
                        {selectedOrder.shippingInfo?.city}, {selectedOrder.shippingInfo?.state} - {selectedOrder.shippingInfo?.pincode}
                    </div>
                </div>
            </div>

            {/* 2. Payment Info */}
            <div className="detail-card">
                <div className="card-title"><CreditCard size={14} /> Payment Details</div>
                <div className="payment-row"><span>Payment Method</span><strong>Online (Razorpay)</strong></div>
                <div className="payment-row"><span>Transaction ID</span><strong className="font-mono text-xs">{selectedOrder.razorpayPaymentId || "N/A"}</strong></div>
                <div className="payment-row"><span>Payment Date</span><strong>{selectedOrder.paidAt ? new Date(selectedOrder.paidAt).toLocaleDateString() : "N/A"}</strong></div>
                <div className="payment-row"><span>Amount Paid</span><strong className="text-green-600">₹{selectedOrder.totalAmount}</strong></div>
            </div>

            {/* 3. Items */}
            <div className="detail-card">
                <div className="card-title"><Package size={14} /> Order Items ({selectedOrder.items?.length})</div>
                {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="panel-item">
                        <img src={item.image} alt="product" onError={(e) => (e.target.src = "https://via.placeholder.com/50")} />
                        <div className="item-info">
                            <p className="item-name">{item.name}</p>
                            <div className="item-meta">Style: {item.style} | SKU: {item.styleCode || 'N/A'}</div>
                            <div className="item-meta">Qty: {item.quantity} x ₹{item.price}</div>
                        </div>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                    </div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="panel-footer">
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Order Status</label>
            <select 
                className="status-select"
                value={selectedOrder.status} 
                onChange={(e) => handleStatusChangeRequest(selectedOrder._id, e.target.value)}
                disabled={selectedOrder.status === 'Cancelled'} // Cancelled can't be undone easily
            >
                <option value="Ordered">Ordered</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered (Verify OTP)</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      )}

      {/* --- OTP VERIFICATION MODAL --- */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
            <div className="otp-modal">
                <div className="modal-icon"><Lock size={32}/></div>
                <h3>Verify Delivery</h3>
                <p>Please enter the 6-digit OTP sent to <strong>{selectedOrder?.email}</strong> to mark this order as Delivered.</p>
                
                <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otpInput}
                    maxLength={6}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="otp-input"
                />
                
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => {setShowOtpModal(false); setOtpInput("");}}>Cancel</button>
                    <button className="verify-btn" onClick={handleVerifyOtp} disabled={otpLoading}>
                        {otpLoading ? "Verifying..." : "Verify & Deliver"}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;