import express from "express";
import {
  getAllExaminer,
  //deleteExaminer,
} from "../controllers/examiner.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.get("/get", verifyToken, getAllExaminer);
// router.delete("/delete/:examiner_id", deleteExaminer);

export default router;
