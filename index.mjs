// index.mjs

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import gradesRouter from './routes/grades.mjs';
import grades_agg from "./routes/grades_agg.mjs";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/grades", gradesRouter);
app.use("/grades", grades_agg);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Grades API! Use /grades to interact with the grades data.');
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
