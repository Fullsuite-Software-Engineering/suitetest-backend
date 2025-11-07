import express from "express";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  toggleActiveStatus,
} from "../controllers/department.controller.mjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.mjs";
import { departmentSchema } from "../schemas/department.schema.mjs";

const router = express.Router();

router.get("/get", getAllDepartments);
router.post("/create", validateSchema(departmentSchema), createDepartment);
router.delete("/delete/:dept_id", deleteDepartment);
router.put(
  "/update/:dept_id",
  validateSchema(departmentSchema),
  updateDepartment
);
router.patch("/toggle-status/:dept_id", toggleActiveStatus);

export default router;
