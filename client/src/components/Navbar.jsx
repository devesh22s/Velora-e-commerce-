import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  ShoppingBag, User, Menu, X, LogOut, Heart, 
  Search, ChevronDown, Package, Bell, HelpCircle, TrendingUp 
} from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/customer?search=${searchTerm}`);
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar" ref={navRef}>
        <div className="navbar-container">
          
          {/* LEFT */}
          <div className="nav-left">
            <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            <Link to="/customer" className="navbar-logo">
                <span className="logo-text">Velora</span>
                <span className="logo-dot">.</span>
            </Link>
          </div>

          {/* CENTER SEARCH */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search for products, brands and more" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn"><Search size={20} /></button>
            </div>
          </form>

          {/* RIGHT ACTIONS */}
          <div className="nav-actions">
            
            {/* PROFILE DROPDOWN */}
            <div className="dropdown-container">
                <div className="action-btn profile-btn" onClick={() => toggleDropdown('profile')}>
                    {user ? (
                        <>
                            <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                            <ChevronDown size={14} className={`chevron ${activeDropdown === 'profile' ? 'rotate' : ''}`} />
                        </>
                    ) : (
                        <span className="login-text">Login</span>
                    )}
                </div>

                {activeDropdown === 'profile' && (
                    <div className="dropdown-menu">
                        {user ? (
                            <>
                                <div className="dd-header"><strong>{user.name}</strong><small>{user.email}</small></div>
                                <Link to="/profile" className="dd-item"><User size={16}/> My Profile</Link>
                                <Link to="/my-orders" className="dd-item"><Package size={16}/> Orders</Link>
                                <Link to="/wishlist" className="dd-item"><Heart size={16}/> Wishlist</Link>
                                <div className="dd-divider"></div>
                                <div className="dd-item logout" onClick={handleLogout}><LogOut size={16}/> Logout</div>
                            </>
                        ) : (
                            <>
                                <div className="dd-header">Welcome</div>
                                <p className="dd-sub">To access account and manage orders</p>
                                <Link to="/login" className="dd-login-btn">LOGIN / SIGNUP</Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* MORE DROPDOWN */}
            <div className="dropdown-container desktop-only">
                <div className="action-btn" onClick={() => toggleDropdown('more')}>
                    <span>More</span>
                    <ChevronDown size={14} className={`chevron ${activeDropdown === 'more' ? 'rotate' : ''}`} />
                </div>
                {activeDropdown === 'more' && (
                    <div className="dropdown-menu">
                        {/* ✅ LINK CHANGED HERE: Redirects to Profile with 'help' tab */}
                        <Link to="/profile?tab=help" className="dd-item"><HelpCircle size={16}/> 24x7 Customer Care</Link>
                        <div className="dd-item"><TrendingUp size={16}/> Advertise</div>
                        <div className="dd-divider"></div>
                        <div className="dd-item"><Bell size={16}/> Download App</div>
                    </div>
                )}
            </div>

            <Link to="/wishlist" className="action-icon desktop-only" title="Wishlist">
                <Heart size={20} />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>

            <Link to="/cart" className="action-btn cart-btn">
                <ShoppingBag size={20} />
                <span>Cart</span>
                {cartCount > 0 && <span className="badge cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
            <div className="drawer-header">
                {user ? (
                    <div className="user-info">
                        <div className="avatar">{user.name.charAt(0)}</div>
                        <div><h4>{user.name}</h4><span>{user.email}</span></div>
                    </div>
                ) : ( <Link to="/login" className="drawer-login">Login & Signup</Link> )}
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <ul className="drawer-list">
                <li><Link to="/customer" onClick={() => setIsMenuOpen(false)}><Package size={18}/> All Products</Link></li>
                <li><Link to="/my-orders" onClick={() => setIsMenuOpen(false)}><Package size={18}/> My Orders</Link></li>
                <li><Link to="/wishlist" onClick={() => setIsMenuOpen(false)}><Heart size={18}/> My Wishlist</Link></li>
                <li><Link to="/cart" onClick={() => setIsMenuOpen(false)}><ShoppingBag size={18}/> My Cart</Link></li>
                <div className="dd-divider"></div>
                {/* ✅ LINK CHANGED HERE TOO */}
                <li><Link to="/profile?tab=help" onClick={() => setIsMenuOpen(false)}><HelpCircle size={18}/> Help Center</Link></li>
                {user && <li className="logout" onClick={handleLogout}><LogOut size={18}/> Logout</li>}
            </ul>
        </div>
        {isMenuOpen && <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)}></div>}
      </nav>
    </div>
  );
}

export default Navbar;