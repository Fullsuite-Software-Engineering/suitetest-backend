import express from "express";
import { createBridge } from "../controllers/bridge.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.post("/create", verifyToken, createBridge);

export default router;
