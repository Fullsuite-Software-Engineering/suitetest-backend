import { where } from "sequelize";
import { Department } from "../models/index.model.mjs";
import { departmentSchema } from "../schemas/department.schema.mjs";

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      order: [["dept_name", "ASC"]],
    });

    if (!departments) {
      return res.status(400).json({ message: "Failed to fetch departments" });
    }

    res.status(200).json({
      message: "Departments retrieved successfully",
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const result = departmentSchema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
        expected: err.expected,
        received: err.received,
      }));

      return res.status(400).json({
        message: "Zod Validation failed",
        errors: formatted,
      });
    }

    const { dept_name } = result.data;

    const department = await Department.create({
      dept_name,
    });

    res.status(201).json({
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    console.error("Failed to create department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { dept_id } = req.params;

    const result = departmentSchema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
        expected: err.expected,
        received: err.received,
      }));

      return res.status(400).json({
        message: "Zod Validation failed",
        errors: formatted,
      });
    }

    const { dept_name } = result.data;

    const department = await Department.findByPk(dept_id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.dept_name = dept_name;
    await department.save();

    res.status(200).json({
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleActiveStatus = async (req, res) => {
  try {
    const { dept_id } = req.params;
    const { is_active } = req.body;

    if (!dept_id) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    if (is_active === undefined) {
      return res.status(400).json({ message: "is_active status is required" });
    }

    const department = await Department.findByPk(dept_id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.is_active = is_active;
    await department.save();

    res.status(200).json({
      message: `Department ${
        is_active ? "activated" : "deactivated"
      } successfully`,
      data: department,
    });
  } catch (error) {
    console.error("Error toggling department status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { dept_id } = req.params;

    if (!dept_id) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const deletedCount = await Department.destroy({
      where: { dept_id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully",
      data: { deleted: deletedCount },
    });
  } catch (error) {
    console.error("Failed to delete department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
