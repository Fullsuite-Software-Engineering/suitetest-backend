import express from "express";
import {
  getAllAnswer,
  getAnswersForTest,
  createAnswer,
  updateAnswer,
  updateMultipleAnswers,
  deleteAnswer,
} from "../controllers/answer_option.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

// FOR TAKING TESTS (no correct answers exposed) - USE THIS DURING TEST
router.get("/test/:question_id", getAnswersForTest);

// FOR ADMIN/RESULTS (includes correct answers) - USE THIS FOR RESULTS
router.get("/get/:question_id", getAllAnswer);

// Alternative route format (keep for backward compatibility)
router.get("/:question_id/get", verifyToken, getAllAnswer);

router.post("/:question_id/create", verifyToken, createAnswer);

router.put("/:answer_id/update", verifyToken, updateAnswer);
router.put("/:answer_id/updateAll", verifyToken, updateMultipleAnswers);

router.delete("/:answer_id/delete", verifyToken, deleteAnswer);

export default router;
