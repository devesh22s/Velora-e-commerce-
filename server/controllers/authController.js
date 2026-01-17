import User from '../models/User.js'; // MongoDB Model
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // ✅ Built-in Node module
import sendEmail from '../utils/sendEmail.js';

// --- REGISTER CONTROLLER ---
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 2. Create User (Password hash model mein automatic ho jayega)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer' // Default role customer
    });

    // 3. Response
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// --- LOGIN CONTROLLER ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User in Database
    const user = await User.findOne({ email });
    
    // Agar user nahi mila
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 2. Check Password (using Model method)
    const isMatch = await user.matchPassword(password);
    
    // Agar password galat hai
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 3. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // 4. Send Response
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role,
        name: user.name 
      } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Server error during login' });
  }
};


// --- 1. FORGOT PASSWORD (Email Bhejo) ---

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("1. Forgot Password Request received for:", email); // Debug Log 1

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash Token and save to DB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    console.log("2. User Token Saved in DB"); // Debug Log 2

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `You have requested a password reset. Please go to this link:\n\n${resetUrl}`;

    try {
      console.log("3. Attempting to send email..."); // Debug Log 3
      
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
      });

      console.log("✅ Email Sent Successfully!"); // Debug Log 4
      res.status(200).json({ success: true, message: "Email sent" });

    } catch (error) {
      // 🔴 EMAIL ERROR YAHAN DIKHEGA
      console.error("❌ EMAIL SENDING FAILED:", error); 

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: "Email could not be sent (Check Server Logs)" });
    }
  } catch (error) {
    // 🔴 GENERAL ERROR YAHAN DIKHEGA
    console.error("❌ SERVER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- 2. RESET PASSWORD (New Password Set Karo) ---
export const resetPassword = async (req, res) => {
  // URL se token milega -> usko hash karke DB se match karenge
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check expiry
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or Expired Token" });
    }

    // Set New Password
    user.password = req.body.password; // Pre-save hook will hash it automatically
    
    // Clear Token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};