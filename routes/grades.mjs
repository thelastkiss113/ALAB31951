// routes/grades.mjs

import express from 'express';
import Grade from '../models/Grade.mjs';

const router = express.Router();

// Create a new grade
router.post('/', async (req, res) => {
  const { class_id, student_id, scores } = req.body;

  try {
    const newGrade = new Grade({ class_id, student_id, scores });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating grade' });
  }
});

// Get a grade by ID
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving grade' });
  }
});

// Get all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving grades' });
  }
});

// Update a grade by ID
router.put('/:id', async (req, res) => {
  const { class_id, student_id, scores } = req.body;

  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { class_id, student_id, scores },
      { new: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.json(updatedGrade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating grade' });
  }
});

// Delete a grade by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);

    if (!deletedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting grade' });
  }
});

// Get all grades for a specific student
router.get('/student/:id', async (req, res) => {
  try {
    const grades = await Grade.find({ student_id: Number(req.params.id) });
    if (!grades || grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this student' });
    }
    res.json(grades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving grades' });
  }
})

export default router;
