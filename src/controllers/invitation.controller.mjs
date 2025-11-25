import { v4 as uuidV4 } from "uuid";
import {
  Invitation,
  Quiz,
  Department,
  Examiner,
} from "../models/index.model.mjs";
import { examinerSchema, invitationSchema } from "../schemas/index.schema.mjs";

export const generateLinkInvitation = async (req, res) => {
  try {
    const result = invitationSchema.safeParse(req.body);

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

    const { quiz_id, dept_id, expiration } = result.data;

    const quiz = await Quiz.findByPk(quiz_id);
    const dept = await Department.findByPk(dept_id);

    if (!quiz || !dept) {
      return res.status(404).json({ message: "Quiz or Department not found." });
    }

    const token = uuidV4();
    const expires_at = new Date(Date.now() + expiration * 60 * 60 * 1000);

    const invitation = await Invitation.create({
      token,
      quiz_id,
      dept_id,
      expires_at,
    });

    const link = `${process.env.FRONT_END_BASE_URL_PROD}/take-quiz/${token}`;

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
      include: [
        {
          model: Quiz,
          attributes: ["quiz_id", "quiz_name", "pdf_link"],
        },
        {
          model: Department,
          attributes: ["dept_id", "dept_name"],
        },
      ],
    });

    if (!invitation)
      return res.status(404).json({ message: "Invalid invitation link." });

    if (invitation.expires_at && new Date(invitation.expires_at) < new Date())
      return res
        .status(400)
        .json({ message: "This invitation link has expired." });

    res.status(200).json({
      message: "Invitation valid.",
      data: {
        dept_id: invitation.dept_id,
        quiz_id: invitation.quiz_id,
        quiz_name: invitation.Quiz?.quiz_name,
        dept_name: invitation.Department?.dept_name,
        pdf_link: invitation.Quiz?.pdf_link,
      },
    });
  } catch (error) {
    console.error("Error validating invitation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const completeLinkInvitation = async (req, res) => {
  try {
    const { token } = req.body;
    const result = examinerSchema.safeParse(req.body);

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

    const { first_name, last_name, email } = result.data;

    const invitation = await Invitation.findOne({
      where: { token },
      include: [
        {
          model: Quiz,
          attributes: ["quiz_id", "quiz_name", "time_limit", "pdf_link"],
        },
      ],
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invalid invitation token." });
    }

    const examiner = await Examiner.create({
      first_name,
      last_name,
      email,
      dept_id: invitation.dept_id,
    });

    invitation.examiner_id = examiner.examiner_id;
    await invitation.save();

    res.status(200).json({
      message: "Examiner registered and invitation completed.",
      data: {
        examiner,
        quiz: {
          quiz_id: invitation.Quiz.quiz_id,
          quiz_name: invitation.Quiz.quiz_name,
          time_limit: invitation.Quiz.time_limit,
          pdf_link: invitation.Quiz.pdf_link,
        },
      },
    });
  } catch (error) {
    console.error("Error completing invitation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
