import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../controllers/question_bank.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.get("/get/:quiz_id", getAllQuestion);
router.post("/:quiz_id/create", verifyToken, createQuestion);
router.delete("/:quiz_id/delete/:question_id", verifyToken, deleteQuestion);
router.put("/:quiz_id/update/:question_id", verifyToken, updateQuestion);

export default router;
