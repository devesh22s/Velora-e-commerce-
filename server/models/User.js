import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  
  // Forgot Password fields
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true
});

// --- 1. Password Hash Middleware (FIXED) ---
// ✅ Change: 'next' parameter hata diya hai.
userSchema.pre('save', async function () {
  
  // 1. Agar password change nahi hua hai (jaise reset token save karte waqt)
  // toh hum seedha return kar denge.
  if (!this.isModified('password')) {
    return; 
  }

  // 2. Password ko Hash karo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- 2. Password Match Method ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;