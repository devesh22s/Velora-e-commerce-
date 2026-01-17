import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'; // ✅ Import Eye Icons
import './Login.css'; // Shared CSS
import API_URL from '../config';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  
  // ✅ Toggle States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
        return toast.error("Password must be at least 6 characters long!");
    }
    if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      toast.success('Registration Successful! Please Login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => toast.info("Google Signup integration coming soon!");

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {/* LEFT SIDE */}
        <div className="auth-branding">
          <h2>Looks like you're new here!</h2>
          <p>Sign up with your mobile number to get started</p>
          <img src="/velora.png" alt="Register Art" />
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-container">
          <form onSubmit={handleRegister}>
            
            <div className="input-group">
                <User className="input-icon" size={18} />
                <input type="text" name="name" required onChange={handleChange} placeholder="Full Name" />
                <label>Full Name</label>
            </div>

            <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input type="email" name="email" required onChange={handleChange} placeholder="Email Address" />
                <label>Email Address</label>
            </div>

            {/* PASSWORD FIELD WITH TOGGLE */}
            <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input 
                    type={showPassword ? "text" : "password"} // ✅ Dynamic Type
                    name="password" 
                    required 
                    minLength="6"
                    onChange={handleChange} 
                    placeholder="Password (Min 6 chars)" 
                />
                <label>Password</label>
                
                {/* ✅ EYE ICON BUTTON */}
                <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {/* CONFIRM PASSWORD FIELD WITH TOGGLE */}
            <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input 
                    type={showConfirmPassword ? "text" : "password"} // ✅ Dynamic Type
                    name="confirmPassword" 
                    required 
                    onChange={handleChange} 
                    placeholder="Confirm Password" 
                />
                <label>Confirm Password</label>

                {/* ✅ EYE ICON BUTTON */}
                <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="form-footer">
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Continue'}
              </button>
            </div>

            <div className="divider"><span>OR</span></div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <img src="/G.png" alt="Google" width={20} />
              Continue with Google
            </button>

            <Link to="/login" className="switch-link">Existing User? Log in</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;