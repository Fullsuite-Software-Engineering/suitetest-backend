import { AnswerOption } from "../models/index.model.mjs";
import { answerOptionSchema } from "../schemas/answer_option.schema.mjs";

// FOR TAKING TESTS - WITHOUT CORRECT ANSWERS (SECURE)
export const getAnswersForTest = async (req, res) => {
  try {
    const { question_id } = req.params;

    const answers = await AnswerOption.findAll({
      where: { question_id },
      attributes: {
        include: ["answer_id", "option_text"],
        exclude: ["is_correct"],
      },
      order: [["answer_id", "ASC"]],
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
      order: [["answer_id", "ASC"]],
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

    const result = answerOptionSchema.safeParse(req.body);

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

    const { option_text, is_correct } = result.data;

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

    const result = answerOptionSchema.safeParse(req.body);

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

    const { option_text, is_correct } = result.data;

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

export const updateMultipleAnswers = async (req, res) => {
  try {
    const { quiz_id, question_id, answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "No answers provided" });
    }

    const results = answers.map((ans) => answerOptionSchema.safeParse(ans));
    const errors = results
      .filter((r) => !r.success)
      .map((r, i) => ({
        index: i,
        errors: r.error?.issues?.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      }));

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed for one or more answers",
        errors,
      });
    }

    const updatedAnswers = [];

    for (const answer of answers) {
      const existing = await AnswerOption.findByPk(answer.answer_id);

      if (existing) {
        existing.option_text = answer.option_text;
        existing.is_correct = answer.is_correct;
        await existing.save();
        updatedAnswers.push(existing);
      } else {
        // Optionally allow new answers to be created
        const newAnswer = await AnswerOption.create({
          question_id,
          option_text: answer.option_text,
          is_correct: answer.is_correct,
        });
        updatedAnswers.push(newAnswer);
      }
    }

    res.status(200).json({
      message: "Answers updated successfully",
      data: updatedAnswers,
    });
  } catch (error) {
    console.error("Error updating multiple answers:", error);
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
