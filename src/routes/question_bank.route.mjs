import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../controllers/question_bank.controller.mjs";

const router = express.Router();

router.get("/get/:quiz_id", getAllQuestion);
router.post("/:quiz_id/create", createQuestion);
router.delete("/:quiz_id/delete/:question_id", deleteQuestion);
router.put("/:quiz_id/update/:question_id", updateQuestion);

export default router;
