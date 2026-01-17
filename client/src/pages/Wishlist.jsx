import React from 'react';
import Navbar from '../components/Navbar';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist after adding to cart
  };

  return (
    <div className="wishlist-page">
      <Navbar />
      <div className="wishlist-container">
        <h1 className="wishlist-title">My Wishlist ({wishlist.length})</h1>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <Heart size={64} className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Save items that you like in your wishlist. Review them anytime and easily move them to the bag.</p>
            <Link to="/customer" className="btn-shop">Start Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div key={product.STYLE} className="wishlist-card">
                <div className="img-container">
                  <img src={product.IMAGE_URL} alt={product.STYLE_NAME} />
                  <button className="btn-remove" onClick={() => toggleWishlist(product)}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="truncate">{product.STYLE_NAME}</h3>
                  <p className="brand">{product.BRAND}</p>
                  <div className="price-row">
                    <span className="price">₹{product.MRP}</span>
                  </div>
                </div>
                <button className="btn-move-cart" onClick={() => handleMoveToCart(product)}>
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;