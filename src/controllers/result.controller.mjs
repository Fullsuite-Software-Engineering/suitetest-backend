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
      return res.status(200).json({
        data: [],
      });
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

// export const createResult = async (req, res) => {
//   try {
//     const { examiner_id, quiz_id, answers, status } = req.body;

//     const questions = await QuestionBank.findAll({
//       where: {
//         quiz_id,
//       },
//       include: [
//         {
//           model: AnswerOption,
//           attributes: ["answer_id", "option_text", "is_correct"],
//         },
//       ],
//     });

//     let score = 0;
//     let totalScoredQuestions = 0;
//     let detailedResults = [];

//     for (const answer of answers) {
//       const question = questions.find(
//         (q) => q.question_id === answer.question_id
//       );

//       if (!question) {
//         return res.status(400).json({ message: "Question not found." });
//       }

//       const type = question.question_type;

//       // Get correct answers for this question
//       const correctOptions = question.AnswerOptions.filter(
//         (opt) => opt.is_correct
//       );
//       const correctAnswerIds = correctOptions.map((opt) => opt.answer_id);
//       const correctAnswerTexts = correctOptions.map((opt) =>
//         opt.option_text.trim().toLowerCase()
//       );

//       let userAnswers = [];
//       let isCorrect = false;

//       // Handle different answer formats
//       if (Array.isArray(answer.selected_answer)) {
//         userAnswers = answer.selected_answer;
//       } else {
//         userAnswers = [answer.selected_answer];
//       }

//       // Filter out null/undefined answers
//       userAnswers = userAnswers.filter((a) => a !== null && a !== undefined);

//       if (type === "CB") {
//         // Checkbox questions - must match all correct answers exactly
//         const userAnswerIds = userAnswers
//           .map((answer) => {
//             // If answer is text, find matching option ID
//             if (typeof answer === "string") {
//               const option = question.AnswerOptions.find(
//                 (opt) =>
//                   opt.option_text.trim().toLowerCase() ===
//                   answer.trim().toLowerCase()
//               );
//               return option ? option.answer_id : null;
//             }
//             return answer; // Assume it's already an ID
//           })
//           .filter((id) => id !== null);

//         isCorrect =
//           userAnswerIds.length === correctAnswerIds.length &&
//           userAnswerIds.every((id) => correctAnswerIds.includes(id)) &&
//           correctAnswerIds.every((id) => userAnswerIds.includes(id));
//       } else {
//         // Single choice questions (TF, MC)
//         let userAnswer = userAnswers[0];

//         // Convert text answer to ID if needed
//         if (typeof userAnswer === "string") {
//           const option = question.AnswerOptions.find(
//             (opt) =>
//               opt.option_text.trim().toLowerCase() ===
//               userAnswer.trim().toLowerCase()
//           );
//           userAnswer = option ? option.answer_id : null;
//         }

//         isCorrect = correctAnswerIds.includes(userAnswer);
//       }

//       if (isCorrect) {
//         score += question.points || 1;
//       }

//       totalScoredQuestions++;

//       detailedResults.push({
//         question_id: question.question_id,
//         user_answer: answer.selected_answer,
//         is_correct: isCorrect,
//         correct_answers: correctOptions.map((opt) => opt.option_text),
//       });
//     }

//     let finalStatus = status;
//     if (!finalStatus) {
//       finalStatus =
//         answers.length < questions.length ? "ABANDONED" : "COMPLETED";
//     }

//     const result = await Result.create({
//       examiner_id,
//       quiz_id,
//       score,
//       total_questions: questions.length,
//       status: finalStatus,
//     });

//     res.status(201).json({
//       message: "Result created successfully",
//       data: {
//         ...result.toJSON(),
//         detailed_results: detailedResults,
//         max_score: totalScoredQuestions,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating result", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

export const createResult = async (req, res) => {
  try {
    const { examiner_id, quiz_id, answers, status } = req.body;

    // Fetch quiz questions with answer options
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
