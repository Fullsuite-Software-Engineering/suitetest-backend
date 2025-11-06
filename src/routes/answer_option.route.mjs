import express from "express";
import {
  getAllAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answer_option.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { answerOptionSchema } from "../schemas/answer_option.schema.mjs";

const router = express.Router();

router.get("/get/:question_id", getAllAnswer);

router.get("/:question_id/get", getAllAnswer);

router.post(
  "/:question_id/create",
  validateSchema(answerOptionSchema),
  createAnswer
);

// Update a specific answer
router.put(
  "/:answer_id/update",
  validateSchema(answerOptionSchema),
  updateAnswer
);

// Delete a specific answer
router.delete("/:answer_id/delete", deleteAnswer);

export default router;
