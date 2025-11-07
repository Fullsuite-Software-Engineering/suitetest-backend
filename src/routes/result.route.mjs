import express from "express";
import {
  getAllResult,
  createResult,
  deleteResult,
} from "../controllers/result.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { resultSchema } from "../schemas/result.schema.mjs";

const router = express.Router();

router.get("/get", getAllResult);
router.post("/create", validateSchema(resultSchema), createResult);
router.delete("/delete", deleteResult);

export default router;
