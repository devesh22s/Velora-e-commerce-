import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import OrderTracker from '../components/OrderTracker';
import { MapPin, Phone, ChevronLeft, Download, ShieldCheck } from 'lucide-react';
import API_URL from '../config';
import './OrderDetail.css'; // Niche CSS hai

function OrderDetail() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Is ID ke liye specific order fetch karein
    // Note: Humein backend me '/api/orders/:id' route chahiye, 
    // agar wo nahi h to hum 'myorders' se filter kar lenge temporary fix ke liye.
    const fetchOrder = async () => {
        try {
            const res = await fetch(`${API_URL}/api/orders/myorders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            const foundOrder = data.find(o => o._id === orderId);
            setOrder(foundOrder);
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };
    if(token) fetchOrder();
  }, [orderId, token]);

  if (loading) return <div className="p-10 text-center">Loading details...</div>;
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  return (
    <div className="order-detail-page">
      <Navbar />
      <div className="od-container">
        {/* Breadcrumb */}
        <div className="od-breadcrumb">
            <Link to="/my-orders" className="flex items-center gap-1 text-blue-600 hover:underline">
                <ChevronLeft size={16}/> Back to Orders
            </Link>
            <span>/</span>
            <span>Order #{order._id.slice(-6).toUpperCase()}</span>
        </div>

        <div className="od-layout">
            {/* LEFT: Shipping & Tracker */}
            <div className="od-left">
                <div className="od-card address-section">
                    <h3>Delivery Address</h3>
                    <div className="addr-content">
                        <h4>{order.customerName}</h4>
                        <p>{order.shippingInfo.address}</p>
                        <p>{order.shippingInfo.city} - {order.shippingInfo.pincode}</p>
                        <p className="phone"><strong>Phone:</strong> {order.shippingInfo.phone}</p>
                    </div>
                </div>

                <div className="od-card">
                    <h3>Order Tracking</h3>
                    <OrderTracker currentStatus={order.status} timeline={order.timeline} />
                </div>
            </div>

            {/* RIGHT: Items & Invoice */}
            <div className="od-right">
                <div className="od-card">
                    <h3>Items in this Order</h3>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="od-item">
                            <div className="img-wrapper">
                                <img src={item.image} alt={item.name} onError={(e)=>e.target.src='https://via.placeholder.com/60'} />
                            </div>
                            <div className="item-info">
                                <Link to={`/product/${item.styleCode}`} className="item-link">{item.name}</Link>
                                <p className="size-qty">Size: {item.style} | Qty: {item.quantity}</p>
                                <p className="price">₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="od-card price-breakdown">
                    <h3>Price Details</h3>
                    <div className="row"><span>List Price</span><span>₹{order.totalAmount}</span></div>
                    <div className="row"><span>Shipping</span><span className="text-green-600">Free</span></div>
                    <div className="divider"></div>
                    <div className="row total"><span>Total Amount</span><span>₹{order.totalAmount}</span></div>
                    <div className="payment-mode">
                        <ShieldCheck size={16} /> Paid via Razorpay
                    </div>
                </div>
                
                <button className="invoice-btn" onClick={() => window.print()}>
                    <Download size={18} /> Download Invoice
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;