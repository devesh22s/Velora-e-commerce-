import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // <--- NEW IMPORT
import './ProductDetail.css';
import { Box, Leaf, Globe, Heart } from 'lucide-react';
import API_URL from '../config';

function ProductDetail() {
  const { styleId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // <--- NEW HOOK
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [allImages, setAllImages] = useState([]); 

  // 1. Data Fetching
  useEffect(() => {
    window.scrollTo(0, 0); 
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.STYLE === styleId);
        if (foundProduct) {
          setProduct(foundProduct);
          const imagesList = (foundProduct.IMAGES && foundProduct.IMAGES.length > 0) 
                             ? foundProduct.IMAGES : [foundProduct.IMAGE_URL];
          setAllImages(imagesList);
          setMainImage(imagesList[0]);
          setSelectedSize(''); 
          const related = data.filter(p => p.CATEGORY === foundProduct.CATEGORY && p.STYLE !== styleId);
          setRelatedProducts(related.slice(0, 4));
        }
      })
      .catch(err => console.error("Error loading product:", err));
  }, [styleId]);

  if (!product) return <div className="loading-screen">Loading Product...</div>;

  // Logic
  const selectedVariant = product.VARIANTS.find(v => v.AGE === selectedSize);

  const getStockStatus = () => {
    if (!selectedVariant) return null;
    const qty = selectedVariant.STOCK_QTY;
    if (qty === 0) return <div className="stock-warning text-red">Out of Stock</div>;
    if (qty > 0 && qty <= 5) return <div className="stock-warning"><span className="dot"></span> Low stock - Only {qty} left!</div>;
    return <div className="stock-warning text-green">In Stock</div>;
  };

  // --- NEW BUY NOW FUNCTION ---
  const handleBuyNow = () => {
    if (!selectedSize) {
        alert('Please select a size first');
        return;
    }
    // Add to cart and redirect immediately
    addToCart({ ...product, selectedVariant });
    navigate('/cart');
  };

  return (
    <div className="detail-page">
      <Navbar />
      
      <div className="product-container">
        
        {/* --- LEFT: Image Gallery --- */}
        <div className="image-section">
          <div className="thumbnail-list">
            {allImages.map((img, index) => (
              <div key={index} className={`thumb-box ${mainImage === img ? 'active' : ''}`} onClick={() => setMainImage(img)}>
                <img src={img} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>

          <div className="main-image-frame">
            {/* --- WISHLIST TOGGLE --- */}
            <div 
                className={`heart-icon ${isInWishlist(product.STYLE) ? 'active-wishlist' : ''}`}
                onClick={() => toggleWishlist(product)}
                style={{ cursor: 'pointer', zIndex: 10 }} // Styling fix
            >
                <Heart 
                    fill={isInWishlist(product.STYLE) ? "red" : "none"} 
                    color={isInWishlist(product.STYLE) ? "red" : "black"} 
                />
            </div>
            <img src={mainImage} alt={product.STYLE_NAME} className="main-img-display" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400'; }} />
          </div>
        </div>

        {/* --- RIGHT: Product Info --- */}
        <div className="info-section">
          <p className="brand-tag">{product.BRAND}</p>
          <h1 className="product-title">{product.STYLE_NAME}</h1>
          
          <div className="price-block">
            <span className="current-price">₹{product.MRP}</span>
            <span className="tax-note">inclusive of all taxes</span>
          </div>

          <div className="size-selector">
            <label>SELECT SIZE</label>
            <div className="size-grid">
                {product.VARIANTS.map(v => (
                    <button
                        key={v.SKU_CODE}
                        className={`size-btn ${selectedSize === v.AGE ? 'selected' : ''} ${v.STOCK_QTY === 0 ? 'disabled' : ''}`}
                        onClick={() => v.STOCK_QTY > 0 && setSelectedSize(v.AGE)}
                        disabled={v.STOCK_QTY === 0}
                    >
                        {v.AGE}
                    </button>
                ))}
            </div>
            {selectedSize && <p className="size-guide-text">Selected: <strong>{selectedSize}</strong></p>}
          </div>

          {getStockStatus()}

          {/* --- ACTION BUTTONS (ADD TO CART + BUY NOW) --- */}
          <div className="action-buttons">
              <button 
                className={`btn-cart ${(!selectedVariant || selectedVariant.STOCK_QTY === 0) ? 'disabled' : ''}`}
                disabled={!selectedVariant || selectedVariant.STOCK_QTY === 0}
                onClick={() => {
                  if(!selectedSize) return alert('Please select a size first');
                  addToCart({...product, selectedVariant});
                }}
              >
                {selectedVariant && selectedVariant.STOCK_QTY === 0 ? 'SOLD OUT' : 'ADD TO CART'}
              </button>

              <button 
                className={`btn-buy ${(!selectedVariant || selectedVariant.STOCK_QTY === 0) ? 'disabled' : ''}`}
                disabled={!selectedVariant || selectedVariant.STOCK_QTY === 0}
                onClick={handleBuyNow}
              >
                BUY NOW
              </button>
          </div>

          <div className="features-list">
            <div className="feature-item"><Leaf size={18} /> <span>100% Organic Cotton</span></div>
            <div className="feature-item"><Box size={18} /> <span>Easy Returns</span></div>
            <div className="feature-item"><Globe size={18} /> <span>Pan India Delivery</span></div>
          </div>

          <div className="accordion">
            <details open>
              <summary>PRODUCT DESCRIPTION</summary>
              <div className="desc-content">
                <p>{product.DESCRIPTION ? product.DESCRIPTION : `High quality ${product.CATEGORY} from ${product.BRAND}.`}</p>
                <br/>
                <p><strong>Style Code:</strong> {product.STYLE}</p>
              </div>
            </details>
            <details>
              <summary>DELIVERY & RETURNS</summary>
              <p>Dispatched within 24 hours. Returns accepted within 7 days of delivery.</p>
            </details>
          </div>
        </div>
      </div>

      <div className="related-section">
        <h2>You Might Also Like</h2>
        <div className="related-grid">
          {relatedProducts.map(item => (
            <div key={item.STYLE} className="related-card" onClick={() => navigate(`/product/${item.STYLE}`)}>
              <div className="related-img-box"><img src={item.IMAGE_URL} alt={item.STYLE_NAME} /></div>
              <div className="related-info"><h4>{item.STYLE_NAME}</h4><p>₹{item.MRP}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;