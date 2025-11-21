import { Quiz, QuestionBank } from "../models/index.model.mjs";
import { quizSchema } from "../schemas/quiz.schema.mjs";

export const getAllQuiz = async (req, res) => {
  try {
    const { dept_id } = req.params;

    if (!dept_id) {
      return res.status(400).json({ message: "Department Id is required" });
    }

    const quizzes = await Quiz.findAll({
      where: { dept_id },
    });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({ message: "No Quizzes" });
    }

    // Add question count to each quiz
    const quizzesWithCount = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await QuestionBank.count({
          where: { quiz_id: quiz.quiz_id },
        });
        return {
          ...quiz.toJSON(),
          question_count: questionCount,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Quiz retrieved successfully", data: quizzesWithCount });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { dept_id, pdf_link } = req.body; // Added pdf_link here

    const result = quizSchema.safeParse(req.body);

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

    const { quiz_name, time_limit } = result.data;

    const quiz = await Quiz.create({
      dept_id,
      quiz_name,
      time_limit,
      pdf_link: pdf_link || null, // Added pdf_link field
    });

    res.status(200).json({ message: "Quiz created successfully", data: quiz });
  } catch (error) {
    console.error("Failed to create quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const { pdf_link } = req.body; // Added pdf_link here

    const result = quizSchema.safeParse(req.body);

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

    const { quiz_name, time_limit } = result.data;

    const quiz = await Quiz.findByPk(quiz_id);

    if (!quiz) {
      return res.status(400).json({ message: "Cannot find quiz" });
    }

    quiz.quiz_name = quiz_name;
    quiz.time_limit = time_limit;
    quiz.pdf_link = pdf_link !== undefined ? pdf_link : quiz.pdf_link; // Update pdf_link if provided
    await quiz.save();

    res.status(201).json({ message: "Quiz updated successfully", data: quiz });
  } catch (error) {
    console.error("Error Updating Quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;

    const deleteQuiz = await Quiz.destroy({
      where: { quiz_id },
    });

    res
      .status(201)
      .json({ message: "Quiz deleted successfully", data: deleteQuiz });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};