import express from "express";
import {
  getAllQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { quizSchema } from "../schemas/quiz.schema.mjs";

const router = express.Router();

router.get("/get/:dept_id", getAllQuiz);
router.post("/:dept_id/create", validateSchema(quizSchema), createQuiz);
router.delete("/:dept_id/delete/:quiz_id", deleteQuiz);
router.put("/:dept_id/update/:quiz_id", validateSchema(quizSchema), updateQuiz);

export default router;
