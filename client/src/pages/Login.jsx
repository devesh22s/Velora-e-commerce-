import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Mail, Lock, User } from 'lucide-react';
import './Login.css';
import API_URL from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      
      if (data.user.role === 'admin') navigate('/admin/orders');
      else navigate('/customer');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Real implementation requires backend setup or Firebase
    toast.info("Google Login integration coming soon!");
    // window.location.href = `${API_URL}/api/auth/google`; // Example
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="auth-branding">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img src="/velora.png" alt="Login Art" />
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="auth-form-container">
          <form onSubmit={handleLogin}>
            
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter Email" 
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter Password" 
              />
              <label>Password</label>
            </div>
            <div className="forgot-pass-wrapper">
                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <div className="form-footer">
              <p>By continuing, you agree to Velora's Terms of Use and Privacy Policy.</p>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="divider"><span>OR</span></div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <img src="/G.png" alt="Google" width={20} />
              Continue with Google
            </button>

            <Link to="/register" className="switch-link">New to Velora? Create an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;