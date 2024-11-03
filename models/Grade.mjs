import mongoose from "mongoose";

// Schema for individual scores within a grade document
const scoreSchema = new mongoose.Schema({
  type: String, // type of score, e.g., "quiz", "exam"
  score: Number, // the score itself
});

// Main schema for a grade document
const gradeSchema = new mongoose.Schema({
  learner_id: Number, // unique ID of the learner
  class_id: String, // ID of the class
  scores: [scoreSchema], // array of scores for different assessments
});

// Create the Mongoose model for the `grades` collection
const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
