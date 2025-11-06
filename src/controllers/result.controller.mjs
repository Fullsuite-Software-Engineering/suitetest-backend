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
      error: error.message 
    });
  }
};

export const createResult = async (req, res) => {
  try {
    const { examiner_id, quiz_id, score, status } = req.body;

    console.log("=== CREATE RESULT REQUEST ===");
    console.log("Received data:", { examiner_id, quiz_id, score, status });
    console.log("Data types:", {
      examiner_id: typeof examiner_id,
      quiz_id: typeof quiz_id,
      score: typeof score,
      status: typeof status
    });

    // Validate required fields
    const validationErrors = [];
    
    if (!quiz_id) {
      validationErrors.push("quiz_id is required");
    }

    if (score === undefined || score === null) {
      validationErrors.push("score is required");
    }

    if (!status) {
      validationErrors.push("status is required");
    }

    // Validate status value
    const validStatuses = ["COMPLETED", "ABANDONED"];
    if (status && !validStatuses.includes(status)) {
      validationErrors.push(`status must be one of: ${validStatuses.join(", ")}`);
    }

    if (validationErrors.length > 0) {
      console.log("Validation errors:", validationErrors);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: validationErrors,
        details: validationErrors
      });
    }

    // Check if quiz exists
    const quizExists = await Quiz.findByPk(quiz_id);
    if (!quizExists) {
      console.log("Quiz not found:", quiz_id);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: ["Quiz not found with provided quiz_id"],
        details: ["Quiz not found with provided quiz_id"]
      });
    }

    // Check if examiner exists (only if examiner_id is provided)
    if (examiner_id) {
      const examinerExists = await Examiner.findByPk(examiner_id);
      if (!examinerExists) {
        console.log("Examiner not found:", examiner_id);
        return res.status(400).json({ 
          message: "Validation failed",
          errors: ["Examiner not found with provided examiner_id"],
          details: ["Examiner not found with provided examiner_id"]
        });
      }
    }

    // Prepare data for creation
    const resultData = {
      examiner_id: examiner_id || null,
      quiz_id: parseInt(quiz_id),
      score: parseFloat(score),
      status,
      created_at: new Date(),
    };

    console.log("Creating result with data:", resultData);

    // Create the result
    const result = await Result.create(resultData);

    console.log("Result created successfully:", result.toJSON());

    res.status(201).json({ 
      message: "Result created successfully", 
      data: result 
    });
  } catch (error) {
    console.error("=== ERROR CREATING RESULT ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    
    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(e => e.message);
      console.log("Sequelize validation errors:", errors);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: errors,
        details: errors
      });
    }

    // Handle Sequelize foreign key constraint errors
    if (error.name === "SequelizeForeignKeyConstraintError") {
      const errorMsg = "Referenced record does not exist";
      console.log("Foreign key error:", errorMsg);
      return res.status(400).json({ 
        message: "Foreign key constraint failed",
        errors: [errorMsg],
        details: [errorMsg]
      });
    }

    // Handle Sequelize database errors
    if (error.name === "SequelizeDatabaseError") {
      console.log("Database error:", error.message);
      return res.status(400).json({ 
        message: "Database error",
        errors: [error.message],
        details: [error.message]
      });
    }

    // Generic error handler
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message,
      errors: [error.message],
      details: error.errors?.map(e => e.message) || [error.message]
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
        message: "Result not found" 
      });
    }

    res.status(200).json({ 
      message: "Result retrieved successfully", 
      data: result 
    });
  } catch (error) {
    console.error("Error retrieving result:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { result_id } = req.params;
    const { score, status } = req.body;

    const result = await Result.findByPk(result_id);

    if (!result) {
      return res.status(404).json({ 
        message: "Result not found" 
      });
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ["Passed", "Failed", "Pending"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: "Validation failed",
          details: [`status must be one of: ${validStatuses.join(", ")}`]
        });
      }
    }

    // Update fields
    if (score !== undefined) result.score = score;
    if (status) result.status = status;

    await result.save();

    res.status(200).json({ 
      message: "Result updated successfully", 
      data: result 
    });
  } catch (error) {
    console.error("Error updating result:", error);
    
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation failed",
        details: error.errors.map(e => e.message)
      });
    }

    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { result_id } = req.params;

    const result = await Result.findByPk(result_id);

    if (!result) {
      return res.status(404).json({ 
        message: "Result not found" 
      });
    }

    await result.destroy();

    res.status(200).json({ 
      message: "Result deleted successfully", 
      data: { result_id } 
    });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
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
      data: results 
    });
  } catch (error) {
    console.error("Error retrieving results by quiz:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
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
      data: results 
    });
  } catch (error) {
    console.error("Error retrieving results by examiner:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};