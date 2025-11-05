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

router.get("/:question_id/get", getAllAnswer);
router.post(
  "/:question_id/create",
  validateSchema(answerOptionSchema),
  createAnswer
);
router.delete("/:question_id/delete", deleteAnswer);
router.put(
  "/:question_id/update/:answer_id",
  validateSchema(answerOptionSchema),
  updateAnswer
);

export default router;
