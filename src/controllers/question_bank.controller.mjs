import { QuestionBank } from "../models/index.model.mjs";

export const getAllQuestion = async (req, res) => {
  try {
    const { quiz_id } = req.params;

    const questions = await QuestionBank.findAll({
      where: { quiz_id },
    });

    res
      .status(200)
      .json({ message: "Questions Retrieved Successfully", data: questions });
  } catch (error) {
    console.error("Error Retrieving Questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { quiz_id, question_text, question_type, points, explanation } =
      req.body;

    const question = await QuestionBank.create({
      quiz_id,
      question_text,
      question_type,
      points,
      explanation,
    });

    res
      .status(201)
      .json({ message: "Question Created Successfully", data: question });
  } catch (error) {
    console.error("Error Creating Question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const { question_text, question_type, points, explanation } = req.body;

    const question = await QuestionBank.findByPk(question_id);

    question.question_text = question_text;
    question.question_type = question_type;
    question.points = points;
    question.explanation = explanation;
    await question.save();

    res
      .status(201)
      .json({ message: "Question Updated Successfully", data: question });
  } catch (error) {
    console.error("Error Updating Question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;

    const deletedQuestion = await QuestionBank.destroy({
      where: { question_id },
    });

    res.status(201).json({
      message: "Question Deleted Successfully",
      data: deletedQuestion,
    });
  } catch (error) {
    console.error("Error Deleting Question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
