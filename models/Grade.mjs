// models/Grade.mjs

import mongoose from "mongoose";

// Schema for individual scores within a grade document
const scoreSchema = new mongoose.Schema({
  type: String, // the type of score (quiz, exam, homework)
  score: Number, // the score value
});

// Main schema for a grade document
const gradeSchema = new mongoose.Schema({
  learner_id: Number, // ID of the learner
  class_id: String, // ID of the class
  scores: [scoreSchema], // array of scores for different types of scores
});

// Create the Mongoose model for the `grades` collection
const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
