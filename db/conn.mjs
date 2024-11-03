// db/conn.mjs

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI;

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Call the function to connect
connectToDatabase();
