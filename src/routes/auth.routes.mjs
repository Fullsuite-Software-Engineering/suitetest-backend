import express from "express";
import { login } from "../controllers/auth.controller.mjs";
import { loginSchema } from "../schemas/auth.schema.mjs";

const router = express.Router();

const validate = (schema) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors });
  }
};

router.post("/login", validate(loginSchema), login);

export default router;
