import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API_URL from "../config";
import "./ForgotPassword.css"; // ✅ Import CSS

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // ... logic same ...
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Email Sent! Check your inbox.");
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Use CSS classes instead of Tailwind classes */}
      <div className="forgot-container">
        <div className="forgot-card">
          <h2 className="forgot-title">Forgot Password</h2>
          <p className="forgot-desc">Enter your email and we'll send you a reset link.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="forgot-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;