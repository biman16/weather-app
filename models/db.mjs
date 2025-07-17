//const mongoose = require('mongoose');
import mongoose from "mongoose";

const mongoURI = "mongodb+srv://bimandas1611:k3U5ykpYCzwoeJiJ@cluster0.qblrlzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the app
  }
};

//module.exports = connectDB;
export default connectDB;
