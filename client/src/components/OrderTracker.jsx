import React from 'react';
import { Check, Clock, Truck, Package, XCircle } from 'lucide-react';
import './OrderTracker.css';

const steps = [
  { status: 'Ordered', label: 'Ordered', icon: <Clock size={18} /> },
  { status: 'Shipped', label: 'Shipped', icon: <Package size={18} /> },
  { status: 'Out for Delivery', label: 'Out for Delivery', icon: <Truck size={18} /> },
  { status: 'Delivered', label: 'Delivered', icon: <Check size={18} /> }
];

const OrderTracker = ({ currentStatus, timeline = [] }) => {
  const isCancelled = currentStatus === 'Cancelled';
  
  // Find active step index
  const currentIndex = steps.findIndex(s => s.status === currentStatus);
  const activeIndex = currentIndex === -1 ? (isCancelled ? -1 : 0) : currentIndex;

  const getTimelineData = (status) => {
    return timeline.slice().reverse().find(t => t.status === status);
  };

  if (isCancelled) {
    return (
      <div className="tracker-cancelled">
        <XCircle size={24} />
        <div>
          <h4>Order Cancelled</h4>
          <p>This order has been cancelled as per your request or due to unforeseen circumstances.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tracker-container">
      {steps.map((step, index) => {
        const isCompleted = index <= activeIndex;
        const isCurrent = index === activeIndex;
        const data = getTimelineData(step.status);

        return (
          <div 
            key={step.status} 
            className={`tracker-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
          >
            {/* 1. Icon & Connector Wrapper */}
            <div className="step-visuals">
              <div className="step-icon">
                {isCompleted ? <Check size={14} strokeWidth={3} /> : step.icon}
              </div>
              {/* Line connecting to next step */}
              {index < steps.length - 1 && (
                <div className={`step-line ${index < activeIndex ? 'line-active' : ''}`}></div>
              )}
            </div>

            {/* 2. Text Details */}
            <div className="step-content">
              <h4 className="step-label">{step.label}</h4>
              
              {data && (
                <div className="step-meta">
                  <span className="step-date">
                    {new Date(data.timestamp).toLocaleDateString('en-IN', { 
                        weekday: 'short', day: 'numeric', month: 'short' 
                    })}
                  </span>
                  
                  {/* Show Admin Message if it's not the default generic message */}
                  {data.message && data.message !== `Order status updated to ${step.status}` && (
                    <p className="step-message">{data.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracker;