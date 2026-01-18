# 🛍️ Velora - Modern Full Stack E-commerce Platform

Velora is a fully functional, business-ready e-commerce application built using the MERN Stack (MongoDB, Express, React, Node.js). It is designed to handle real-world shopping scenarios with secure payments, order tracking, and a comprehensive admin panel.

## 🚀 Key Features

### 🛒 Customer Panel
- **Secure Authentication:** JWT-based Login/Signup with Forgot Password functionality (Email OTP).
- **Product Browsing:** Advanced filtering (Category, Price, Brand, Gender) and Search.
- **Cart & Wishlist:** Real-time cart management and wishlist functionality.
- **Checkout & Payments:** Integrated **Razorpay** for secure online payments.
- **Order History:** Detailed order tracking with status updates.

### 🛡️ Admin Dashboard
- **Analytics:** Visual charts for Sales, Revenue, and Order stats.
- **Product Management:** Add/Edit/Delete products with **Cloudinary** Image Upload integration.
- **Order Management:** Update order status (Shipped, Out for Delivery).
- **Secure Delivery System:** Unique **OTP Verification** mechanism to mark orders as 'Delivered' (prevents fake deliveries).

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens), Bcrypt.js
- **Payment Gateway:** Razorpay
- **Image Storage:** Cloudinary
- **Email Service:** Nodemailer (Gmail SMTP)

## ⚙️ Installation & Setup

1. Clone the repository
2. Install dependencies for server and client (`npm install`)
3. Set up environment variables (.env)
4. Run the application (`npm run dev`)

---
