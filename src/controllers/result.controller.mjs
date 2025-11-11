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

    console.log("Received result creation request:", {
      examiner_id,
      quiz_id,
      answers,
      status
    });

    // Get all questions for this quiz
    const questions = await QuestionBank.findAll({
      where: {
        quiz_id,
      },
      include: [
        {
          model: AnswerOption,
          attributes: ["answer_id", "option_text", "is_correct"],
        },
      ],
    });

    console.log("Found questions:", questions.length);
    console.log("User answers:", answers);

    let score = 0;
    let totalScoredQuestions = 0;
    let detailedResults = [];

    for (const answer of answers) {
      const question = questions.find(
        (q) => q.question_id === answer.question_id
      );
      
      if (!question) {
        console.log(`Question ${answer.question_id} not found`);
        continue;
      }

      const type = question.question_type;
      console.log(`Processing question ${answer.question_id}, type: ${type}`);

      // Skip descriptive questions for auto-scoring
      if (type === "DESC") {
        detailedResults.push({
          question_id: question.question_id,
          user_answer: answer.selected_answer,
          is_correct: null,
          correct_answers: question.AnswerOptions.filter(opt => opt.is_correct).map(opt => opt.option_text)
        });
        continue;
      }

      // Get correct answers for this question
      const correctOptions = question.AnswerOptions.filter(opt => opt.is_correct);
      const correctAnswerIds = correctOptions.map(opt => opt.answer_id);
      const correctAnswerTexts = correctOptions.map(opt => opt.option_text.trim().toLowerCase());

      console.log(`Correct answers for Q${answer.question_id}:`, {
        ids: correctAnswerIds,
        texts: correctAnswerTexts
      });

      let userAnswers = [];
      let isCorrect = false;

      // Handle different answer formats
      if (Array.isArray(answer.selected_answer)) {
        userAnswers = answer.selected_answer;
      } else {
        userAnswers = [answer.selected_answer];
      }

      // Filter out null/undefined answers
      userAnswers = userAnswers.filter(a => a !== null && a !== undefined);
      
      console.log(`User answers for Q${answer.question_id}:`, userAnswers);

      if (type === "CB") {
        // Checkbox questions - must match all correct answers exactly
        const userAnswerIds = userAnswers.map(answer => {
          // If answer is text, find matching option ID
          if (typeof answer === 'string') {
            const option = question.AnswerOptions.find(
              opt => opt.option_text.trim().toLowerCase() === answer.trim().toLowerCase()
            );
            return option ? option.answer_id : null;
          }
          return answer; // Assume it's already an ID
        }).filter(id => id !== null);

        isCorrect = 
          userAnswerIds.length === correctAnswerIds.length &&
          userAnswerIds.every(id => correctAnswerIds.includes(id)) &&
          correctAnswerIds.every(id => userAnswerIds.includes(id));

        console.log(`Checkbox result for Q${answer.question_id}:`, {
          userAnswerIds,
          correctAnswerIds,
          isCorrect
        });

      } else {
        // Single choice questions (TF, MC)
        let userAnswer = userAnswers[0];
        
        // Convert text answer to ID if needed
        if (typeof userAnswer === 'string') {
          const option = question.AnswerOptions.find(
            opt => opt.option_text.trim().toLowerCase() === userAnswer.trim().toLowerCase()
          );
          userAnswer = option ? option.answer_id : null;
        }

        isCorrect = correctAnswerIds.includes(userAnswer);
        
        console.log(`Single choice result for Q${answer.question_id}:`, {
          userAnswer,
          correctAnswerIds,
          isCorrect
        });
      }

      if (isCorrect) {
        score += question.points || 1;
      }

      totalScoredQuestions++;
      
      detailedResults.push({
        question_id: question.question_id,
        user_answer: answer.selected_answer,
        is_correct: isCorrect,
        correct_answers: correctOptions.map(opt => opt.option_text)
      });
    }

    console.log(`Final score: ${score}/${totalScoredQuestions}`);

    let finalStatus = status;
    if (!finalStatus) {
      finalStatus =
        answers.length < questions.length ? "ABANDONED" : "COMPLETED";
    }

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
        max_score: totalScoredQuestions
      },
    });
  } catch (error) {
    console.error("Error creating result", error);
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