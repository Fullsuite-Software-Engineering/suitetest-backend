import express from "express";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  toggleActiveStatus,
} from "../controllers/department.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

router.get("/get", getAllDepartments);
router.post("/create", verifyToken, createDepartment);
router.delete("/delete/:dept_id", verifyToken, deleteDepartment);
router.put("/update/:dept_id", verifyToken, updateDepartment);
router.patch("/toggle-status/:dept_id", verifyToken, toggleActiveStatus);

export default router;
