import { Department, Examiner } from "../models/index.model.mjs";

export const getAllExaminer = async (req, res) => {
  try {
    const examiners = await Examiner.findAll({
      order: [["created_at", "ASC"]],
      include: [
        {
          model: Department,
          attributes: ["dept_name"],
        },
      ],
    });

    if (!examiners) {
      return res.status(400).json({ message: "Failed to fetch examiners" });
    }

    res
      .status(200)
      .json({ message: "Examiners retrieved successfully", data: examiners });
  } catch (error) {
    console.error("Error fetching examiners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const createExaminer = async (req, res) => {
//   try {
//     const { first_name, last_name, email, dept_id } = req.body;

//     if (!first_name || !last_name || !email) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const examiner = await Examiner.create({
//       first_name,
//       last_name,
//       email,
//       dept_id,
//     });

//     res.status(201).json({
//       message: "Examiner created successfully",
//       data: examiner,
//     });
//   } catch (error) {
//     console.error("Error creating examiner:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const udpateExaminer = async (req, res) => {
  try {
    const { examiner_id } = req.params;
    const { first_name, last_name, email } = req.body;

    if (!examiner_id) {
      return res.status(400).json({ message: "Examiner Id is required" });
    }

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: "Fields are required" });
    }

    const examiner = await Examiner.findByPk(examiner_id);

    if (!examiner) {
      return res.status(404).json({ message: "Department not found" });
    }

    examiner.first_name = first_name;
    examiner.last_name = last_name;
    examiner.email = email;
    await examiner.save();

    res.status(201).json({
      message: "Examiner updated successfully",
      data: examiner,
    });
  } catch (error) {
    console.error("Error updating examiner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExaminer = async (req, res) => {
  try {
    const { examiner_id } = req.params;

    if (!examiner_id) {
      return res.status(400).json({ message: "Examiner Id is required" });
    }

    const deletedExaminer = await Examiner.destroy({
      where: { examiner_id },
    });

    if (deletedExaminer === 0) {
      return res.status(404).json({ message: "Examiner not found" });
    }

    res.status(201).json({
      message: "Examiner deleted successfully",
      data: deletedExaminer,
    });
  } catch (error) {
    console.error("Error deleting examiner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
