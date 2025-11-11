import express from "express";
import { createBridge } from "../controllers/bridge.controller.mjs";

const router = express.Router();

router.post("/create", createBridge);

export default router;
