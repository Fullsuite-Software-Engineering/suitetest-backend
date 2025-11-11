import {
  AnswerOption,
  Department,
  Examiner,
  QuestionBank,
  Quiz,
  Result,
} from "../models/index.model.mjs";

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
    const questions = await QuestionBank.findAll({
      where: {
        quiz_id,
      },
      include: [
        {
          model: AnswerOption,
          where: { is_correct: true },
          attributes: ["option_text"],
        },
      ],
    });

    let score = 0;

    for (const answer of answers) {
      const question = questions.find(
        (ques) => ques.question_id === answer.question_id
      );
      if (!question) continue;

      const type = question.question_type;

      if (type === "descriptive") {
        continue;
      }

      const correctAnswers = question.AnswerOptions.filter(
        (opt) => opt.is_correct
      ).map((opt) => opt.option_text.trim().toLowerCase());

      const userAnswers = Array.isArray(answer.selected_answer)
        ? answer.selected_answer.map((a) => a.trim().toLowerCase())
        : [answer.selected_answer.trim().toLowerCase()];

      if (type === "checkbox") {
        const isEqual =
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((a) => correctAnswers.includes(a));

        if (isEqual) score++;
      } else {
        if (userAnswers[0] === correctAnswers[0]) score++;
      }

      totalScoredQuestions++;
    }

    let finalStatus = status;
    if (!finalStatus) {
      finalStatus =
        answers.length < questions.length ? "ABANDONED" : "COMPLETED";
    }

    const result = await Result.create({
      examiner_id,
      quiz_id,
      score,
      status: finalStatus,
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
