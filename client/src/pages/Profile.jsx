import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom"; // ✅ Import useSearchParams
import {
  User,
  MapPin,
  Package,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  Send,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "./Profile.css";
import API_URL from "../config";
import { Link } from "react-router-dom";

function Profile() {
  const { user, token, logout } = useAuth();
  const [searchParams] = useSearchParams(); // ✅ Initialize hook

  // Default tab is 'orders', but if URL has ?tab=help, start with 'help'
  const [activeTab, setActiveTab] = useState("orders");
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Help Center State
  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });

  // --- 1. HANDLE TAB SWITCHING FROM URL ---
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'help') {
        setActiveTab('help');
    } else if (tab === 'address') {
        setActiveTab('address');
    } else {
        // If no tab in URL, default to orders (or keep current if user navigated manually)
        // But for initial load, let's respect the state logic
    }
  }, [searchParams]);

  // --- FETCH ORDERS ON LOAD (Only if tab is orders) ---
  useEffect(() => {
    if (activeTab === "orders" && token) {
      fetchOrders();
    }
  }, [activeTab, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HELP CENTER SUBMIT ---
  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending message...");

    try {
      const res = await fetch(`${API_URL}/api/admin/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...supportForm,
          name: user.name,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.update(toastId, {
          render: "Message sent! Check your inbox.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setSupportForm({ subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to send message.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // --- HELPER: ORDER STATUS COLOR ---
  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-600 bg-green-50";
    if (status === "Shipped") return "text-blue-600 bg-blue-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        {/* --- LEFT SIDEBAR NAVIGATION --- */}
        <div className="profile-sidebar">
          <div className="user-brief">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="user-text">
              <h3>{user?.name || "Guest User"}</h3>
              <p>{user?.email || "guest@example.com"}</p>
            </div>
          </div>

          <nav className="profile-nav">
            <button
              className={`nav-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <Package size={20} /> My Orders
            </button>
            <button
              className={`nav-btn ${activeTab === "address" ? "active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              <MapPin size={20} /> Addresses
            </button>
            <button
              className={`nav-btn ${activeTab === "help" ? "active" : ""}`}
              onClick={() => setActiveTab("help")}
            >
              <HelpCircle size={20} /> Help Center
            </button>
            <button className="nav-btn logout-btn" onClick={logout}>
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="profile-content">
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2 className="tab-title">Order History</h2>
              
              {loading ? <div className="loader">Loading...</div> : 
               orders.length === 0 ? (
                <div className="empty-state"><Package size={48} className="text-gray-300"/><p>No orders placed yet.</p></div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card-compact">
                      
                      {/* 1. Header */}
                      <div className="card-header">
                        <div className="meta-info">
                            <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>

                      {/* 2. Items Preview */}
                      <div className="card-body">
                        <div className="item-preview-list">
                            {order.items.slice(0, 3).map((item, i) => (
                                <div key={i} className="preview-item">
                                    <img src={item.image} alt="product" onError={(e)=>e.target.src='https://via.placeholder.com/50'} />
                                    <div className="item-brief">
                                        <p className="name">{item.name}</p>
                                        <p className="qty">x{item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            {order.items.length > 3 && <div className="more-count">+{order.items.length - 3} more</div>}
                        </div>
                        
                        <div className="total-section">
                            <span>Total Amount</span>
                            <span className="amount">₹{order.totalAmount}</span>
                        </div>
                      </div>

                      {/* 3. Action Footer */}
                      <Link to={`/order/${order._id}`} className="card-footer-link">
                        View Details & Track <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeTab === "address" && (
            <div className="tab-content">
              <h2 className="tab-title">Saved Addresses</h2>
              {orders.length > 0 && orders[0].shippingInfo ? (
                <div className="address-card">
                  <div className="addr-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="addr-details">
                    <h4>Default Delivery Address</h4>
                    <p>{orders[0].shippingInfo.address}</p>
                    <p>
                      {orders[0].shippingInfo.city} -{" "}
                      {orders[0].shippingInfo.pincode}
                    </p>
                    <p>Phone: {orders[0].shippingInfo.phone}</p>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <MapPin size={48} className="text-gray-300" />
                  <p>No addresses found. Place an order to save one!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HELP CENTER */}
          {activeTab === "help" && (
            <div className="tab-content">
              <h2 className="tab-title">Help Center</h2>
              <p className="tab-subtitle">
                Need help with an order? Send us a message.
              </p>

              <div className="contact-options">
                <div className="contact-box">
                  <Phone size={20} /> <span>+91 9999999999</span>
                </div>
                <div className="contact-box">
                  <Mail size={20} /> <span>www.velora.com</span>
                </div>
              </div>

              <form className="support-form" onSubmit={handleSupportSubmit}>
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={supportForm.subject}
                    onChange={(e) =>
                      setSupportForm({
                        ...supportForm,
                        subject: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select an issue</option>
                    <option value="Order Status">Where is my order?</option>
                    <option value="Return/Refund">Return or Refund</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows="5"
                    placeholder="Describe your issue..."
                    value={supportForm.message}
                    onChange={(e) =>
                      setSupportForm({
                        ...supportForm,
                        message: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
                <button type="submit" className="send-btn">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;