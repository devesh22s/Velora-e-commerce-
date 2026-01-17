import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages Imports
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import AdminAddProduct from './pages/AdminAddProduct';
import MyOrders from './pages/MyOrders';
import Welcome from './pages/Welcome'; 
import Wishlist from './pages/Wishlist';
import PaymentSuccess from './pages/PaymentSuccess'; // <--- 1. IMPORT THIS
import OrderDetail from './pages/OrderDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ... (ProtectedRoute aur PublicOnlyRoute same rahenge) ...
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
     return <Navigate to={user.role === 'admin' ? '/admin/orders' : '/customer'} replace />;
  }
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/orders' : '/customer'} replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      
      {/* ADMIN */}
      <Route path="/admin" element={<Navigate to="/admin/orders" replace />} />
      <Route path="/admin/orders" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/add-product" element={<ProtectedRoute role="admin"><AdminAddProduct /></ProtectedRoute>} />

      {/* CUSTOMER */}
      <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute role="customer"><Cart /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="customer"><Profile /></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute role="customer"><MyOrders /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute role="customer"><Wishlist /></ProtectedRoute>} />
      <Route path="/order/:orderId" element={<ProtectedRoute role="customer"><OrderDetail /></ProtectedRoute>} />
      
      {/* --- 2. NEW ROUTE ADDED HERE --- */}
      <Route path="/paymentsuccess" element={<ProtectedRoute role="customer"><PaymentSuccess /></ProtectedRoute>} />

      {/* SHARED */}
      <Route path="/product/:styleId" element={<ProductDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      {/*  forgot password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <AppRoutes />
            <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;