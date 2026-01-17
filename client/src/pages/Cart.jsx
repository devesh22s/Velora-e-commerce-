import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { ShieldCheck, Check, Plus } from "lucide-react";
import "./Cart.css";
import API_URL from "../config";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, updateVariant } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // --- STATES ---
  const [savedAddress, setSavedAddress] = useState(null); // Backend se aaya hua address
  const [useSavedAddress, setUseSavedAddress] = useState(true); // Toggle: True = Saved, False = New form
  
  // Form State for NEW Address
  const [newAddress, setNewAddress] = useState({
    name: user?.name || "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "Home"
  });

  // --- 1. FETCH LAST ADDRESS ---
  useEffect(() => {
    if (!token) return;
    const fetchLastAddress = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/last-address`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok && data.shippingInfo) {
            setSavedAddress({ ...data.shippingInfo, name: data.name });
            setUseSavedAddress(true); // Default to saved address
        } else {
            setUseSavedAddress(false); // No saved address, show form
        }
      } catch (error) {
        console.error("Address fetch error", error);
      }
    };
    fetchLastAddress();
  }, [token]);

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddressTypeChange = (type) => {
    setNewAddress({ ...newAddress, addressType: type });
  };

  // --- CHECKOUT LOGIC ---
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // 1. Validate Items
    const invalidItem = cart.find(item => !item.selectedVariant);
    if (invalidItem) { 
        toast.error(`Please select a size for ${invalidItem.STYLE_NAME}`); 
        document.getElementById(`item-${invalidItem.STYLE}`)?.scrollIntoView({ behavior: 'smooth' });
        return; 
    }

    // 2. Determine Final Shipping Info
    let finalShippingInfo = {};

    if (useSavedAddress && savedAddress) {
        finalShippingInfo = savedAddress;
    } else {
        // Validate New Form
        const { name, phone, pincode, address, city, state } = newAddress;
        if (!name || !phone || !pincode || !address || !city || !state) {
            toast.error("Please fill all required address details.");
            return;
        }
        if (phone.length !== 10) {
            toast.error("Invalid phone number.");
            return;
        }
        finalShippingInfo = newAddress;
    }

    // 3. Payment Flow
    const res = await loadRazorpayScript();
    if (!res) { toast.error("Payment Gateway failed."); return; }

    try {
        const response = await fetch(`${API_URL}/api/payment/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ cartItems: cart }),
        });
        
        const orderData = await response.json();
        if (!orderData.success) throw new Error(orderData.error);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.order.amount,
            currency: "INR",
            name: "Lilly & Sid",
            description: "Order Payment",
            order_id: orderData.order.id,
            handler: async function (response) {
                try {
                    const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderItems: cart,
                            userId: user?._id || user?.id,
                            userEmail: user?.email,
                            userName: finalShippingInfo.name || user?.name,
                            shippingInfo: {
                                ...finalShippingInfo,
                                fullAddress: `${finalShippingInfo.address}, ${finalShippingInfo.city}, ${finalShippingInfo.state} - ${finalShippingInfo.pincode}`
                            },
                            totalAmount: cartTotal,
                        }),
                    });
                    
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        clearCart();
                        navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
                    } else { throw new Error("Verification Failed"); }
                } catch (err) {
                    navigate("/my-orders");
                    toast.error("Order saved with issues. Check My Orders.");
                }
            },
            prefill: { name: finalShippingInfo.name, email: user?.email, contact: finalShippingInfo.phone },
            theme: { color: "#2874f0" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (err) {
        toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fk-cart-page">
      <Navbar />
      <div className="fk-container">
        {cart.length === 0 ? (
            <div className="fk-empty-cart">
                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" />
                <h3>Your cart is empty!</h3>
                <Link to="/customer" className="fk-btn-shop">Shop Now</Link>
            </div>
        ) : (
            <div className="fk-layout">
                {/* --- LEFT SECTION --- */}
                <div className="fk-left-section">
                    
                    {/* STEP 1: LOGIN */}
                    <div className="fk-section fk-step-completed">
                        <div className="fk-step-number">1</div>
                        <div className="fk-step-info">
                            <div className="fk-step-header"><h3>LOGIN</h3><Check size={16} /></div>
                            <p><span className="fk-user-name">{user?.name}</span> <span className="fk-user-phone">{user?.email}</span></p>
                        </div>
                    </div>

                    {/* STEP 2: DELIVERY ADDRESS */}
                    <div className="fk-section fk-active-step">
                        <div className="fk-header">
                            <span className="fk-step-number active">2</span>
                            <h3>DELIVERY ADDRESS</h3>
                        </div>
                        
                        <div className="address-wrapper">
                            {/* OPTION A: SAVED ADDRESS */}
                            {savedAddress && (
                                <div className={`saved-address-card ${useSavedAddress ? 'selected' : ''}`}>
                                    <div className="address-header" onClick={() => setUseSavedAddress(true)}>
                                        <input type="radio" checked={useSavedAddress} onChange={() => setUseSavedAddress(true)} />
                                        <div className="address-content">
                                            <div className="name-row">
                                                <span className="name">{savedAddress.name}</span>
                                                <span className="type-tag">{savedAddress.addressType || 'Home'}</span>
                                                <span className="phone">{savedAddress.phone}</span>
                                            </div>
                                            <p className="full-addr">
                                                {savedAddress.address}, {savedAddress.locality}, {savedAddress.city}, {savedAddress.state} - <strong>{savedAddress.pincode}</strong>
                                            </p>
                                            
                                            {/* Deliver Here Button only shows when selected */}
                                            {useSavedAddress && (
                                                <button className="deliver-btn">DELIVER HERE</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* OPTION B: ADD NEW ADDRESS */}
                            <div className={`new-address-section ${!useSavedAddress ? 'expanded' : ''}`}>
                                <div className="new-address-header" onClick={() => setUseSavedAddress(false)}>
                                    <Plus size={18} className="plus-icon"/>
                                    <span>ADD A NEW ADDRESS</span>
                                </div>

                                {/* Form shows only if useSavedAddress is FALSE */}
                                {!useSavedAddress && (
                                    <div className="fk-address-form slide-down">
                                        <div className="form-grid">
                                            <input type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleInputChange} />
                                            <input type="number" name="phone" placeholder="10-digit mobile number" value={newAddress.phone} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-grid">
                                            <input type="text" name="pincode" placeholder="Pincode" value={newAddress.pincode} onChange={handleInputChange} />
                                            <input type="text" name="locality" placeholder="Locality" value={newAddress.locality} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-full">
                                            <textarea name="address" placeholder="Address (Area and Street)" rows="3" value={newAddress.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-grid">
                                            <input type="text" name="city" placeholder="City/District/Town" value={newAddress.city} onChange={handleInputChange} />
                                            <select name="state" value={newAddress.state} onChange={handleInputChange}>
                                                <option value="">-- Select State --</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Karnataka">Karnataka</option>
                                                {/* Add more states */}
                                            </select>
                                        </div>
                                        <div className="form-grid">
                                            <input type="text" name="landmark" placeholder="Landmark (Optional)" value={newAddress.landmark} onChange={handleInputChange} />
                                            <input type="number" name="alternatePhone" placeholder="Alternate Phone (Optional)" value={newAddress.alternatePhone} onChange={handleInputChange} />
                                        </div>
                                        <div className="address-type-group">
                                            <label>Address Type</label>
                                            <div className="radio-group">
                                                <label className={`radio-btn ${newAddress.addressType === 'Home' ? 'selected' : ''}`}>
                                                    <input type="radio" name="addressType" checked={newAddress.addressType === 'Home'} onChange={() => handleAddressTypeChange('Home')} />
                                                    Home
                                                </label>
                                                <label className={`radio-btn ${newAddress.addressType === 'Work' ? 'selected' : ''}`}>
                                                    <input type="radio" name="addressType" checked={newAddress.addressType === 'Work'} onChange={() => handleAddressTypeChange('Work')} />
                                                    Work
                                                </label>
                                            </div>
                                        </div>
                                        
                                        {/* Save Button for Form */}
                                        <button className="deliver-btn" onClick={() => toast.success("Address details captured ready for checkout")}>
                                            SAVE AND DELIVER HERE
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: ORDER SUMMARY */}
                    <div className="fk-section">
                        <div className="fk-header">
                            <span className="fk-step-number active">3</span>
                            <h3>ORDER SUMMARY</h3>
                        </div>
                        <div className="fk-cart-items">
                            {cart.map(item => (
                                <div key={item.STYLE} id={`item-${item.STYLE}`} className="fk-item-card">
                                    <div className="fk-img-box"><img src={item.IMAGE_URL} alt={item.STYLE_NAME} /></div>
                                    <div className="fk-item-details">
                                        <h4>{item.STYLE_NAME}</h4>
                                        <div className="fk-size-row">
                                            <span className="label">Size:</span>
                                            <select 
                                                className={`size-dropdown ${!item.selectedVariant ? 'error-border' : ''}`}
                                                value={item.selectedVariant?.SKU_CODE || ""}
                                                onChange={(e) => {
                                                    const variant = item.VARIANTS.find(v => v.SKU_CODE === e.target.value);
                                                    updateVariant(item.STYLE, variant);
                                                }}
                                            >
                                                <option value="" disabled>Select</option>
                                                {item.VARIANTS?.map(v => (
                                                    <option key={v.SKU_CODE} value={v.SKU_CODE} disabled={v.STOCK_QTY===0}>
                                                        {v.AGE} {v.STOCK_QTY===0?'(OOS)':''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="fk-sub-text">Seller: Lilly & Sid India</p>
                                        <div className="fk-price-row">
                                            <span className="fk-current-price">₹{item.MRP * item.quantity}</span>
                                            <span className="fk-original-price">₹{Math.round(item.MRP * 1.2 * item.quantity)}</span>
                                            <span className="fk-discount">20% Off</span>
                                        </div>
                                        <div className="fk-actions">
                                            <div className="qty-counter">
                                                <button onClick={() => updateQuantity(item.STYLE, item.quantity - 1)} disabled={item.quantity === 1}> – </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.STYLE, item.quantity + 1)}> + </button>
                                            </div>
                                            <button className="fk-action-btn remove" onClick={() => removeFromCart(item.STYLE)}>REMOVE</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fk-section disabled-step"><div className="fk-header"><span className="fk-step-number">4</span><h3>PAYMENT OPTIONS</h3></div></div>
                </div>

                {/* --- RIGHT SECTION --- */}
                <div className="fk-right-section">
                    <div className="fk-price-card">
                        <div className="price-header">PRICE DETAILS</div>
                        <div className="price-body">
                            <div className="price-row"><span>Price ({cart.length} items)</span><span>₹{Math.round(cartTotal * 1.2)}</span></div>
                            <div className="price-row"><span>Discount</span><span className="fk-green">– ₹{Math.round(cartTotal * 0.2)}</span></div>
                            <div className="price-row"><span>Delivery Charges</span><span className="fk-green">Free</span></div>
                            <div className="total-row"><span>Total Amount</span><span>₹{cartTotal}</span></div>
                            <div className="savings-msg">You will save ₹{Math.round(cartTotal * 0.2)} on this order</div>
                        </div>
                    </div>
                    <div className="fk-secure"><ShieldCheck size={28} className="shield-icon" /><div><div className="shield-title">Safe and Secure Payments.</div><div className="shield-desc">100% Authentic products.</div></div></div>
                    <div className="place-order-wrapper"><button className="fk-place-order-btn" onClick={handleCheckout}>PLACE ORDER</button></div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default Cart;