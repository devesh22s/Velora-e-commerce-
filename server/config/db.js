import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Local DB use kar rahe ho to ye URL, Cloud hai to Atlas URL daalna
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lillyandsid');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;