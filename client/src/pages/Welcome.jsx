import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import Auth
import { ShoppingBag, Truck, ShieldCheck, ArrowRight, User } from 'lucide-react';
import './Welcome.css';

function Welcome() {
  const { user } = useAuth(); // Check user status
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      
      {/* --- PROFESSIONAL NAVBAR --- */}
      <nav className="welcome-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">V</span>
            <span className="logo-text">Velora</span>
          </div>
          
          <div className="nav-actions">
            {user ? (
              // AGAR LOGIN HAI: Show "Go to Shop" & Name
              <div className="logged-in-view">
                <span className="welcome-user">Welcome, {user.name.split(' ')[0]}</span>
                <Link to="/customer" className="btn-primary">
                  Go to Dashboard <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              // AGAR LOGIN NAHI HAI: Show Login/Signup
              <div className="guest-view">
                <Link to="/login" className="btn-text">Log In</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">NEW COLLECTION 2025</span>
            <h1>
              Premium Fashion for <br /> 
              <span className="highlight">Great Stars</span>
            </h1>
            <p>
              Discover the finest collection of human' wear that blends comfort, 
              durability, and style. Crafted with 100% Organic Cotton.
            </p>
            
            <div className="cta-group">
              <button onClick={() => navigate('/customer')} className="hero-btn-primary">
                Shop Collection
              </button>
              <button className="hero-btn-secondary">
                View Lookbook
              </button>
            </div>

            <div className="trust-badges">
              <div className="badge-item">
                <strong>10k+</strong> Happy Moms
              </div>
              <div className="divider"></div>
              <div className="badge-item">
                <strong>4.8/5</strong> Rated Quality
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="blob-bg"></div>
            {/* Replace with your actual image path */}
            <img 
              src="/img1.png" 
              alt="Kids Fashion Model" 
              className="hero-img"
              onError={(e) => {
                 e.target.onerror = null; 
                 // Fallback image (Professional Placeholder)
                 e.target.src = "https://images.unsplash.com/photo-1519238263496-4143d3ca5554?q=80&w=800&auto=format&fit=crop"; 
              }} 
            />
          </div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="icon-circle"><ShoppingBag size={28} /></div>
            <h3>Trendy Collection</h3>
            <p>Handpicked styles curated for every season and occasion.</p>
          </div>
          <div className="feature-card">
            <div className="icon-circle"><ShieldCheck size={28} /></div>
            <h3>Premium Quality</h3>
            <p>Certified organic fabrics that are safe for your child's skin.</p>
          </div>
          <div className="feature-card">
            <div className="icon-circle"><Truck size={28} /></div>
            <h3>Fast Delivery</h3>
            <p>Express shipping across India within 3-5 business days.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="welcome-footer">
        <div className="footer-content">
          <p>&copy; 2025  Velora. Designed with ❤️ for Kids.</p>
          <div className="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Welcome;