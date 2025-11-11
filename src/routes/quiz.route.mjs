import express from "express";
import {
  getAllQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.mjs";

const router = express.Router();

router.get("/get/:dept_id", getAllQuiz);
router.post("/:dept_id/create", createQuiz);
router.delete("/:dept_id/delete/:quiz_id", deleteQuiz);
router.put("/:dept_id/update/:quiz_id", updateQuiz);

export default router;
