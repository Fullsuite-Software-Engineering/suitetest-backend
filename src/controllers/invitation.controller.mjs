import { v4 as uuidV4 } from "uuid";
import {
  Invitation,
  Quiz,
  Department,
  Examiner,
  QuestionBank,
  AnswerOption,
} from "../models/index.model.mjs";
import env from "../configs/env.mjs";

export const generateLinkInvitation = async (req, res) => {
  try {
    const { email, quiz_id, dept_id } = req.body;

    if (!email || !quiz_id || !dept_id) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const quiz = await Quiz.findByPk(quiz_id);
    const dept = await Department.findByPk(dept_id);

    if (!quiz || !dept) {
      return res.status(404).json({ message: "Quiz or Department not found." });
    }

    const token = uuidV4();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hour expiration

    const invitation = await Invitation.create({
      token,
      quiz_id,
      dept_id,
      email,
      expires_at,
    });

    const link = `${env.FRONT_END_BASE_URL}/take-quiz/${token}`;

    return res.status(201).json({
      message: "Invitation generated successfully.",
      data: { invitation, link },
    });
  } catch (error) {
    console.error("Error generating invitation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const validateLinkInvitation = async (req, res) => {
  try {
    const { token } = req.params;

    const invitation = await Invitation.findOne({
      where: { token },
      includes: [
        { model: Quiz, attributes: "quiz_name" },
        { model: Department, attributes: "dept_name" },
      ],
    });

    if (!invitation)
      return res.status(404).json({ message: "Invalid invitation link." });

    if (invitation.used)
      return res
        .status(400)
        .json({ message: "This invitation was already used." });

    if (invitation.expires_at && new Date(invitation.expires_at) < new Date())
      return res
        .status(400)
        .json({ message: "This invitation link has expired." });

    res.status(200).json({
      message: "Invitation valid.",
      data: {
        email: invitation.email,
        quiz: invitation.Quiz,
        department: invitation.Department,
      },
    });
  } catch (error) {
    console.error("Error validating invitation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const completeLinkInvitation = async (req, res) => {
  try {
    const { token, first_name, last_name, email } = req.body;

    const invitation = await Invitation.findOne({
      where: { token },
      include: [
        {
          model: Quiz,
          attributes: ["quiz_id", "quiz_name", "time_limit"],
          include: [
            {
              model: QuestionBank,
              attributes: ["question_id", "question_text"],
              include: [
                {
                  model: AnswerOption,
                  attributes: ["answer_id", "option_text", "is_correct"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invalid invitation token." });
    }

    if (invitation.used) {
      return res.status(400).json({ message: "Invitation already used." });
    }

    const examiner = await Examiner.create({
      first_name,
      last_name,
      email,
      dept_id: invitation.dept_id,
    });

    invitation.examiner_id = examiner.examiner_id;
    invitation.used = true;
    await invitation.save();

    res.status(200).json({
      message: "Examiner registered and invitation completed.",
      data: {
        examiner,
        quiz: invitation.Quiz,
      },
    });
  } catch (error) {
    console.error("Error completing invitation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
