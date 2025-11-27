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
          attributes: ["quiz_name", "quiz_id"],
          include: [
            {
              model: QuestionBank,
              attributes: ["question_id", "quiz_id", "points", "question_type"],
              include: [
                {
                  model: AnswerOption,
                  attributes: ["answer_id", "question_id", "is_correct"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!results || results.length === 0) {
      return res.status(200).json({
        data: [],
      });
    }

    // Process each result and calculate total points
    const resultsWithTotalPoints = results.map((result) => {
      const resultData = result.toJSON();
      let totalPoints = 0;

      // Check if Quiz and QuestionBank exist
      if (resultData.Quiz && resultData.Quiz.QuestionBanks) {
        resultData.Quiz.QuestionBanks.forEach((question) => {
          if (
            question.question_type === "CB" ||
            question.question_type === "checkbox"
          ) {
            // For checkbox questions, count points for each correct answer
            const correctAnswersCount =
              question.AnswerOptions?.filter(
                (answer) => answer.is_correct === true
              ).length || 0;

            // Add points multiplied by number of correct answers
            totalPoints += question.points * correctAnswersCount;
          } else {
            // For other question types (MC, TF, etc.), just add the question points once
            totalPoints += question.points || 0;
          }
        });
      }

      resultData.total_points = totalPoints;
      return resultData;
    });

    res.status(200).json({
      message: "Results retrieved successfully",
      data: resultsWithTotalPoints,
    });
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

    const questions = await QuestionBank.findAll({
      where: { quiz_id },
      include: [
        {
          model: AnswerOption,
          attributes: ["answer_id", "option_text", "is_correct"],
        },
      ],
    });

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this quiz." });
    }

    let score = 0;
    const detailedResults = [];

    for (const answer of answers) {
      const question = questions.find(
        (q) => q.question_id === answer.question_id
      );
      if (!question) continue;

      const correctOptions = question.AnswerOptions.filter(
        (opt) => opt.is_correct
      );
      const correctAnswerIds = correctOptions.map((opt) => opt.answer_id);
      const correctAnswerTexts = correctOptions.map((opt) =>
        opt.option_text.trim().toLowerCase()
      );

      // Normalize user answers into array
      let userAnswers = Array.isArray(answer.selected_answer)
        ? answer.selected_answer
        : [answer.selected_answer];
      userAnswers = userAnswers.filter(Boolean);

      let questionScore = 0;
      let isCorrect = false;

      if (question.question_type === "CB") {
        // Checkbox: each correct answer = full question points
        const userAnswerIds = userAnswers
          .map((userAns) => {
            if (typeof userAns === "string") {
              const match = question.AnswerOptions.find(
                (opt) =>
                  opt.option_text.trim().toLowerCase() ===
                  userAns.trim().toLowerCase()
              );
              return match ? match.answer_id : null;
            }
            return userAns;
          })
          .filter(Boolean);

        // Give full points for each correct selection
        const correctSelectedCount = userAnswerIds.filter((id) =>
          correctAnswerIds.includes(id)
        ).length;

        questionScore = correctSelectedCount * (question.points || 1);

        // Fully correct only if all correct answers selected and no extras
        isCorrect =
          correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
          userAnswerIds.every((id) => correctAnswerIds.includes(id));
      } else if (question.question_type === "DESC") {
        // Descriptive: Will compare the user answer into the key answers that is stored in answerOptions where all of them is_correct is true
        let userAnswer = userAnswers[0];
        if (typeof userAnswer === "string") {
          userAnswer = userAnswer.trim().toLowerCase();

          const match = question.AnswerOptions.find((opt) =>
            opt.is_correct
              ? opt.option_text.trim().toLowerCase() === userAnswer
              : false
          );

          isCorrect = !!match;
          questionScore = isCorrect ? question.points || 1 : 0;
        }
      } else {
        // MC / TF: full points if correct
        let userAnswer = userAnswers[0];
        if (typeof userAnswer === "string") {
          const match = question.AnswerOptions.find(
            (opt) =>
              opt.option_text.trim().toLowerCase() ===
              userAnswer.trim().toLowerCase()
          );
          userAnswer = match ? match.answer_id : null;
        }

        isCorrect = correctAnswerIds.includes(userAnswer);
        questionScore = isCorrect ? question.points || 1 : 0;
      }

      score += questionScore;

      detailedResults.push({
        question_id: question.question_id,
        user_answer: answer.selected_answer,
        is_correct: isCorrect,
        points_awarded: questionScore,
        correct_answers: correctAnswerTexts,
      });
    }

    const finalStatus =
      status || (answers.length < questions.length ? "ABANDONED" : "COMPLETED");

    const result = await Result.create({
      examiner_id,
      quiz_id,
      score,
      total_questions: questions.length,
      status: finalStatus,
    });

    res.status(201).json({
      message: "Result created successfully",
      data: {
        ...result.toJSON(),
        detailed_results: detailedResults,
        max_score: questions.reduce(
          (sum, q) =>
            sum +
            (q.question_type === "CB"
              ? q.AnswerOptions.filter((opt) => opt.is_correct).length *
                (q.points || 1)
              : q.points || 1),
          0
        ),
      },
    });
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

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
