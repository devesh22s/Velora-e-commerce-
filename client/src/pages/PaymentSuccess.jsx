import React from 'react';
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from '../components/Navbar';
import './PaymentSuccess.css'; // Create this CSS file

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  return (
    <div className="success-page-wrapper">
      <Navbar />
      <div className="success-container">
        <div className="success-card">
          <div className="animation-circle">
            <CheckCircle size={64} className="success-icon" />
          </div>
          
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-msg">Thank you for your purchase. Your order has been confirmed.</p>
          
          <div className="reference-box">
            <span>Payment ID:</span>
            <strong>{referenceNum}</strong>
          </div>

          <div className="action-buttons">
            <Link to="/my-orders" className="btn-primary">
              <Package size={18} /> Track Order
            </Link>
            <Link to="/customer" className="btn-secondary">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;