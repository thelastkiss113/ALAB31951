// models/Grade.mjs

import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const gradeSchema = new mongoose.Schema({
  scores: [scoreSchema], // An array of score objects
  class_id: {
    type: Number,
    required: true
  },
  student_id: {
    type: Number,
    required: true
  }
});

// Create the model
const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
