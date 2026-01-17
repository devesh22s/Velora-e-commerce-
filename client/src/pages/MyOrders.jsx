import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Package, MapPin, Calendar, CreditCard, ChevronRight } from "lucide-react"; // Arrow icon added
import OrderTracker from "../components/OrderTracker";
import "./MyOrders.css";
import API_URL from "../config";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [token]);

  return (
    <div className="my-orders-page">
      <Navbar />
      <div className="my-orders-container">
        <h1 className="page-title">My Order History</h1>

        {loading && <div className="state-msg">Loading your orders...</div>}
        {error && <div className="state-msg error-msg">Error: {error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="empty-orders">
            <div className="empty-icon">
              <Package size={64} />
            </div>
            <h2 className="empty-title">No orders found</h2>
            <p className="empty-text">Looks like you haven't placed an order yet.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                
                {/* Header */}
                <div className="order-header">
                  <div className="order-meta">
                    <span className="order-id">
                      ORDER #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="order-date">
                      <Calendar size={14} style={{ display: "inline", marginBottom: -2 }} />{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-status-pill">{order.status}</div>
                </div>

                {/* Tracker */}
                <div className="order-tracker-section">
                  <OrderTracker
                    currentStatus={order.status}
                    timeline={order.timeline}
                  />
                </div>

                {/* Body */}
                <div className="order-body">
                  {/* Items */}
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=Item")}
                        />
                        <div className="item-info">
                          <p className="item-name">{item.name}</p>
                          <p className="item-meta">
                            Size: {item.style} | Qty: {item.quantity}
                          </p>
                          <p className="item-price-tag">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Sidebar */}
                  <div className="order-info-sidebar">
                    <div className="info-group">
                      <h4><MapPin size={14} /> Shipping</h4>
                      <p>{order.shippingInfo?.address}</p>
                      <p>{order.shippingInfo?.city}, {order.shippingInfo?.pincode}</p>
                      <p>Phone: {order.shippingInfo?.phone}</p>
                    </div>
                    
                    {/* Updated Total Group with Gap */}
                    <div className="info-group total-group">
                      <h4><CreditCard size={14} /> Total Paid</h4>
                      <span className="total-amount">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Updated Action Link */}
                <div className="order-actions">
                  <Link to={`/order/${order._id}`} className="view-details-btn">
                    View Full Details & Track Status <ChevronRight size={16} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;