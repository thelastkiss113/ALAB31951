import express from "express";
import Grade from "../models/Grade.mjs";

const router = express.Router();

/**
 * Refactored to use Mongoose for aggregation
 */
router.get("/learner/:id/avg-class", async (req, res) => {
  try {
    let result = await Grade.aggregate([
      { $match: { learner_id: Number(req.params.id) } },
      { $unwind: "$scores" },
      {
        $group: {
          _id: "$class_id",
          quiz: {
            $push: {
              $cond: [
                { $eq: ["$scores.type", "quiz"] },
                "$scores.score",
                "$$REMOVE",
              ],
            },
          },
          exam: {
            $push: {
              $cond: [
                { $eq: ["$scores.type", "exam"] },
                "$scores.score",
                "$$REMOVE",
              ],
            },
          },
          homework: {
            $push: {
              $cond: [
                { $eq: ["$scores.type", "homework"] },
                "$scores.score",
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          class_id: "$_id",
          avg: {
            $sum: [
              { $multiply: [{ $avg: "$exam" }, 0.5] },
              { $multiply: [{ $avg: "$quiz" }, 0.3] },
              { $multiply: [{ $avg: "$homework" }, 0.2] },
            ],
          },
        },
      },
    ]);

    if (!result || result.length === 0) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

export default router;
