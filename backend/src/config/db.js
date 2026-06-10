const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
