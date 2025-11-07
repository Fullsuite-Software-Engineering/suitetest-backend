import express from "express";
import { createBridge } from "../controllers/bridge.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { bridgeSchema } from "../schemas/bridge.schema.mjs";

const router = express.Router();

router.post("/create", validateSchema(bridgeSchema), createBridge);

export default router;
