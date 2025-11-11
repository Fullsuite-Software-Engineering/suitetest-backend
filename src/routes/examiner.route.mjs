import express from "express";
import {
  deleteExaminer,
  getAllExaminer,
} from "../controllers/examiner.controller.mjs";

const router = express.Router();

router.get("/get", getAllExaminer);
// router.post("/create", validateSchema(examinerSchema), createExaminer);
router.delete("/delete/:examiner_id", deleteExaminer);
// router.put(
//   "/update/:examiner_id",
//   validateSchema(examinerSchema),
//   udpateExaminer
// );

export default router;
