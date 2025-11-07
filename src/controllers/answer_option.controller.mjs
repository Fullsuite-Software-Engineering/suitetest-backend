import { AnswerOption } from "../models/index.model.mjs";

// FOR TAKING TESTS - WITHOUT CORRECT ANSWERS (SECURE)
export const getAnswersForTest = async (req, res) => {
  try {
    const { question_id } = req.params;

    const answers = await AnswerOption.findAll({
      where: { question_id },
      attributes: ['answer_id', 'option_text'], // EXCLUDE is_correct for security
      order: [['answer_id', 'ASC']],
    });

    res.status(200).json({
      message: "Answer options fetched successfully",
      data: answers,
    });
  } catch (error) {
    console.error("Error retrieving answers for test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// FOR ADMIN OR RESULTS - WITH CORRECT ANSWERS
export const getAllAnswer = async (req, res) => {
  try {
    const { question_id } = req.params;

    const answers = await AnswerOption.findAll({
      where: { question_id },
      order: [['answer_id', 'ASC']],
    });

    res.status(200).json({
      message: "Answers fetched successfully",
      data: answers,
    });
  } catch (error) {
    console.error("Error retrieving answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAnswer = async (req, res) => {
  try {
    const { question_id } = req.params;
    const { option_text, is_correct } = req.body;

    const answer = await AnswerOption.create({
      question_id,
      option_text,
      is_correct,
    });

    res.status(201).json({
      message: "Answer created successfully",
      data: answer,
    });
  } catch (error) {
    console.error("Error Creating Answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const { option_text, is_correct } = req.body;

    const answer = await AnswerOption.findByPk(answer_id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    answer.option_text = option_text;
    answer.is_correct = is_correct;
    await answer.save();

    res.status(200).json({
      message: "Answer updated successfully",
      data: answer,
    });
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;

    const deletedAnswer = await AnswerOption.destroy({
      where: { answer_id },
    });

    if (!deletedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({
      message: "Answer deleted successfully",
      data: deletedAnswer,
    });
  } catch (error) {
    console.error("Error Deleting Answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};