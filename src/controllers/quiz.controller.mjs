import { Quiz } from "../models/index.model.mjs";

export const getAllQuiz = async (req, res) => {
  try {
    const { dept_id } = req.params;

    if (!dept_id) {
      return res.status(400).json({ message: "Department Id is required" });
    }

    const quizzes = await Quiz.findAll({
      where: { dept_id },
    });

    if (!quizzes) {
      return res.status(400).json({ message: "Failed to fetch quizzes" });
    }

    res
      .status(200)
      .json({ message: "Quiz retrieved successfully", data: quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { dept_id, quiz_name, time_limit } = req.body;

    if (!dept_id || !quiz_name || !time_limit) {
      return res.status(400).json({ message: "Fields are required" });
    }

    const quiz = await Quiz.create({
      dept_id,
      quiz_name,
      time_limit,
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
    const { quiz_name, time_limit } = req.body;

    if (!quiz_name || !time_limit) {
      return res.status(400).json({ message: "Fields are required" });
    }

    const quiz = await Quiz.findByPk(quiz_id);

    if (!quiz) {
      res.status(400).json({ message: "Cannot find quiz" });
    }

    quiz.quiz_name = quiz_name;
    quiz.time_limit = time_limit;
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
    console.error("Erro deleting quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
