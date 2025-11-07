import express from "express";
import {
  getAllAnswer,
  getAnswersForTest, // NEW - for secure test taking
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answer_option.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { answerOptionSchema } from "../schemas/answer_option.schema.mjs";

const router = express.Router();

// FOR TAKING TESTS (no correct answers exposed) - USE THIS DURING TEST
router.get("/test/:question_id", getAnswersForTest);

// FOR ADMIN/RESULTS (includes correct answers) - USE THIS FOR RESULTS
router.get("/get/:question_id", getAllAnswer);

// Alternative route format (keep for backward compatibility)
router.get("/:question_id/get", getAllAnswer);

// Create answer
router.post(
  "/:question_id/create",
  validateSchema(answerOptionSchema),
  createAnswer
);

// Update answer
router.put(
  "/:answer_id/update",
  validateSchema(answerOptionSchema),
  updateAnswer
);

// Delete answer
router.delete("/:answer_id/delete", deleteAnswer);

export default router;