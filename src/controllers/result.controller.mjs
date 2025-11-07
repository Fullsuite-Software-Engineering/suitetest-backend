import { Department, Examiner, Quiz, Result } from "../models/index.model.mjs";

export const getAllResult = async (req, res) => {
  try {
    const results = await Result.findAll({
      include: [
        {
          model: Examiner,
          attributes: ["first_name", "last_name", "email"],
          include: [
            {
              model: Department,
              attributes: ["dept_name"],
            },
          ],
        },
        {
          model: Quiz,
          attributes: ["quiz_name"],
        },
      ],
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res
      .status(200)
      .json({ message: "Results retrieved successfully", data: results });
  } catch (error) {
    console.error("Error retrieving results:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createResult = async (req, res) => {
  try {
    const { examiner_id, quiz_id, answers, status } = req.body;

    //checking of results

    const score = 0;

    const result = await Result.create({
      examiner_id,
      quiz_id,
      score,
      status,
    });

    res.status(201).json({
      message: "Result created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating result", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { result_id } = req.params;

    const result = await Result.findByPk(result_id, {
      include: [
        {
          model: Examiner,
          attributes: ["first_name", "last_name", "email"],
          include: [
            {
              model: Department,
              attributes: ["dept_name"],
            },
          ],
        },
        {
          model: Quiz,
          attributes: ["quiz_name", "time_limit"],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.status(200).json({
      message: "Result retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving result:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getResultsByQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;

    const results = await Result.findAll({
      where: { quiz_id },
      include: [
        {
          model: Examiner,
          attributes: ["first_name", "last_name", "email"],
        },
        {
          model: Quiz,
          attributes: ["quiz_name", "time_limit"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      message: "Results retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error retrieving results by quiz:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getResultsByExaminer = async (req, res) => {
  try {
    const { examiner_id } = req.params;

    const results = await Result.findAll({
      where: { examiner_id },
      include: [
        {
          model: Quiz,
          attributes: ["quiz_name", "time_limit"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      message: "Results retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error retrieving results by examiner:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export const updateResult = async (req, res) => {
//   try {
//     const { result_id } = req.params;
//     const { score, status } = req.body;

//     const result = await Result.findByPk(result_id);

//     if (!result) {
//       return res.status(404).json({
//         message: "Result not found",
//       });
//     }

//     if (score !== undefined) result.score = score;
//     if (status) result.status = status;

//     await result.save();

//     res.status(200).json({
//       message: "Result updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error updating result:", error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

export const deleteResult = async (req, res) => {
  try {
    const { result_id } = req.params;

    const result = await Result.findByPk(result_id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    await result.destroy();

    res.status(200).json({
      message: "Result deleted successfully",
      data: { result_id },
    });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
