import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext'; 
import { useWishlist } from '../context/WishlistContext'; 
import { Heart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'; // Search icon removed
import './CustomerDashboard.css';
import API_URL from '../config';

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // ✅ URL Params read karne ke liye
  
  // Filters
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('relevant');
  
  // ✅ FIX: Initialize search term from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const [showFilters, setShowFilters] = useState({ gender: true, category: true, brand: true, price: true });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // --- 1. SYNC SEARCH WITH URL ---
  // Jab bhi URL mein ?search= change ho, state update karo
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchTerm(query);
    setCurrentPage(1); // Search change hone par page 1 pe jao
  }, [searchParams]);

  // Fetch Logic
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => console.error(err));
  }, []);

  // ... (Rest of the Filter Logic remains SAME) ...
  const brands = useMemo(() => [...new Set(products.map(p => p.BRAND))].sort(), [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.CATEGORY))].sort(), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search Logic
      const matchSearch = product.STYLE_NAME.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.BRAND.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.CATEGORY.toLowerCase().includes(searchTerm.toLowerCase()); // Category search support added

      // Filter Logic
      const genderParam = searchParams.get('gender'); // Handle Gender from URL Link
      const effectiveGenderFilter = genderParam ? [genderParam] : selectedGender;

      const matchGender = effectiveGenderFilter.length === 0 || effectiveGenderFilter.includes(product.GENDER || 'Unisex');
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.CATEGORY);
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.BRAND);
      const matchPrice = product.MRP >= priceRange[0] && product.MRP <= priceRange[1];

      return matchSearch && matchGender && matchCategory && matchBrand && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.MRP - b.MRP;
      if (sortBy === 'highToLow') return b.MRP - a.MRP;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [products, searchTerm, selectedGender, selectedCategories, selectedBrands, priceRange, sortBy, searchParams]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  // Handlers
  const toggleSelection = (state, setState, value) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };
  const toggleSection = (section) => {
    setShowFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      {/* ❌ REMOVED: Duplicate Sub-header Search Bar (Kyunki Navbar me search hai) */}
      {/* Agar aapko breadcrumb ya kuch aur chahiye to yahan laga sakte hain */}
      <div style={{ marginTop: '10px' }}></div> 

      <div className="main-layout">
        
        {/* SIDEBAR FILTERS (SAME AS BEFORE) */}
        <aside className="sidebar-filters">
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={() => { setSelectedGender([]); setSelectedCategories([]); setSelectedBrands([]); setPriceRange([0, 10000]); setSearchTerm(''); navigate('/customer'); }}>CLEAR ALL</button>
          </div>

          {/* ... (Price, Gender, Category, Brand sections same as before) ... */}
          <div className="filter-section">
            <div className="section-head" onClick={() => toggleSection('price')}>
              <span>PRICE</span> {showFilters.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </div>
            {showFilters.price && (
              <div className="price-inputs">
                <select onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} value={priceRange[0]}>
                    <option value="0">Min</option><option value="500">₹500</option><option value="1000">₹1000</option>
                </select>
                <span className="to-text">to</span>
                <select onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} value={priceRange[1]}>
                    <option value="10000">₹10000+</option><option value="2000">₹2000</option><option value="5000">₹5000</option>
                </select>
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="section-head" onClick={() => toggleSection('gender')}>
              <span>GENDER</span> {showFilters.gender ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </div>
            {showFilters.gender && (
              <div className="checkbox-group">
                {['Men', 'Women', 'Boys', 'Girls'].map(g => (
                  <label key={g} className="custom-checkbox">
                    <input type="checkbox" checked={selectedGender.includes(g)} onChange={() => toggleSelection(selectedGender, setSelectedGender, g)} />
                    <span className="checkmark"></span> {g}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="section-head" onClick={() => toggleSection('category')}>
              <span>CATEGORIES</span> {showFilters.category ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </div>
            {showFilters.category && (
              <div className="checkbox-group scrollable">
                {categories.map(c => (
                  <label key={c} className="custom-checkbox">
                    <input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggleSelection(selectedCategories, setSelectedCategories, c)} />
                    <span className="checkmark"></span> {c}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section no-border">
            <div className="section-head" onClick={() => toggleSection('brand')}>
              <span>BRAND</span> {showFilters.brand ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </div>
            {showFilters.brand && (
              <div className="checkbox-group scrollable">
                {brands.map(b => (
                  <label key={b} className="custom-checkbox">
                    <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleSelection(selectedBrands, setSelectedBrands, b)} />
                    <span className="checkmark"></span> {b}
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="content-area">
          
          {/* SORT HEADER */}
          <div className="sort-header">
            {searchTerm && <span className="search-result-text">Results for <strong>"{searchTerm}"</strong></span>}
            <span className="result-count">Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} – {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results</span>
            
            <div className="sort-tabs">
                <span className="sort-label">Sort By</span>
                <button className={sortBy === 'relevant' ? 'active' : ''} onClick={() => setSortBy('relevant')}>Relevance</button>
                <button className={sortBy === 'lowToHigh' ? 'active' : ''} onClick={() => setSortBy('lowToHigh')}>Price - Low to High</button>
                <button className={sortBy === 'highToLow' ? 'active' : ''} onClick={() => setSortBy('highToLow')}>Price - High to Low</button>
                <button className={sortBy === 'newest' ? 'active' : ''} onClick={() => setSortBy('newest')}>Newest First</button>
            </div>
          </div>

          {/* PRODUCTS */}
          {loading ? <div className="loader">Loading...</div> : 
           currentItems.length === 0 ? (
             <div className="no-products">
               <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No Result" />
               <h3>Sorry, no results found!</h3>
               <p>Please check the spelling or try searching for something else</p>
             </div>
           ) : (
            <div className="grid-container">
              {currentItems.map((product) => (
                <div key={product._id} className="pro-card" onClick={() => navigate(`/product/${product.STYLE}`)}>
                  <div className="img-box">
                    <img 
                        src={product.IMAGE_URL || "https://placehold.co/300x300?text=No+Image"} 
                        alt="" 
                        loading="lazy" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300?text=No+Image"; }}
                    />
                    <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}>
                      <Heart size={18} className={isInWishlist(product.STYLE) ? "fill-red-500 text-red-500" : "text-gray-300"} />
                    </button>
                  </div>
                  <div className="details-box">
                    <div className="brand-name">{product.BRAND || "Generic"}</div>
                    <div className="prod-name" title={product.STYLE_NAME}>{product.STYLE_NAME}</div>
                    <div className="price-row">
                        <span className="curr-price">₹{product.MRP}</span>
                        <span className="mrp-cut">₹{Math.round(product.MRP * 1.3)}</span>
                        <span className="discount">30% off</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION (Same as before) */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button className="page-nav-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft size={20} />
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={`page-num-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button className="page-nav-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;