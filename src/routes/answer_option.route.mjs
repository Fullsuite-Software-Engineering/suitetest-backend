import express from "express";
import {
  getAllAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answer_option.controller.mjs";

const router = express.Router();

router.get("/get", getAllAnswer);
router.post("/:question_id/create", createAnswer);
router.delete("/:question_id/delete", deleteAnswer);
router.put("/:question_id/update", updateAnswer);

export default router;
