import express from "express";
import {
  getAllQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.get("/get/:dept_id", verifyToken, getAllQuiz);
router.post("/:dept_id/create", verifyToken, createQuiz);
router.delete("/:dept_id/delete/:quiz_id", verifyToken, deleteQuiz);
router.put("/:dept_id/update/:quiz_id", verifyToken, updateQuiz);

export default router;
