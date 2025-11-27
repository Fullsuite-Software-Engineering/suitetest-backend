import express from "express";
import {
  getAllResult,
  createResult,
  deleteResult,
} from "../controllers/result.controller.mjs";

const router = express.Router();

router.get("/get", getAllResult);
router.post("/create", createResult);
router.delete("/delete/:result_id", deleteResult);

export default router;
