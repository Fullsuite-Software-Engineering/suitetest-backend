import express from "express";
import {
  deleteExaminer,
  getAllExaminer,
  udpateExaminer,
} from "../controllers/examiner.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { examinerSchema } from "../schemas/index.schema.mjs";

const router = express.Router();

router.get("/get", getAllExaminer);
// router.post("/create", validateSchema(examinerSchema), createExaminer);
router.delete("/delete/:examiner_id", deleteExaminer);
router.put(
  "/update/:examiner_id",
  validateSchema(examinerSchema),
  udpateExaminer
);

export default router;
