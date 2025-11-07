import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../controllers/question_bank.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { questionBankSchema } from "../schemas/question_bank.schema.mjs";

const router = express.Router();

router.get("/get/:quiz_id", getAllQuestion);
router.post(
  "/:quiz_id/create",
  validateSchema(questionBankSchema),
  createQuestion
);
router.delete("/:quiz_id/delete/:question_id", deleteQuestion);
router.put(
  "/:quiz_id/update/:question_id",
  validateSchema(questionBankSchema),
  updateQuestion
);

export default router;
