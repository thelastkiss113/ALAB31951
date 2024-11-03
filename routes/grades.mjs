// routes/grades.mjs
import express from "express";
import Grade from "../models/Grade.mjs";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;

    // Rename fields for backwards compatibility
    if (newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
    }

    let result = await Grade.create(newDocument);
    res.status(201).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    let result = await Grade.findById(req.params.id);

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

export default router;
