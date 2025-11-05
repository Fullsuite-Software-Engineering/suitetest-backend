import { AnswerOption } from "../models/index.model.mjs";

export const getAllAnswer = async (req, res) => {
  try {
    const { question_id } = req.params;

    const answers = await AnswerOption.findAll({
      where: { question_id },
    });

    res
      .status(200)
      .json({ message: "Answers Fetched Successfully", data: answers });
  } catch (error) {
    console.error("Error retrieving answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAnswer = async (req, res) => {
  try {
    const { question_id, option_text, is_correct } = req.body;

    const answers = await AnswerOption.create({
      question_id,
      option_text,
      is_correct,
    });

    res.status(201).json({
      message: "Answers created successfully",
      data: answers,
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

    const updatedAnswers = await AnswerOption.findByPk(answer_id);

    updatedAnswers.option_text = option_text;
    updatedAnswers.is_correct = is_correct;
    await updatedAnswers.save();

    res.status(201).json({
      message: "Answers updated successfully",
      data: updatedAnswers,
    });
  } catch (error) {
    console.error("Error Updating Answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { answer_id } = req.body;

    const deletedAnswers = await AnswerOption.destroy({
      where: { answer_id },
    });

    res.status(201).json({
      message: "Answers deleted successfully",
      data: deletedAnswers,
    });
  } catch (error) {
    console.error("Error Deleting Answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
