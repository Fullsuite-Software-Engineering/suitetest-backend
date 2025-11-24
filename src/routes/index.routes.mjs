import express from "express";
import examinerRoutes from "../routes/examiner.route.mjs";
import departmentRoutes from "../routes/department.route.mjs";
import quizRoutes from "../routes/quiz.route.mjs";
import questionRoutes from "../routes/question_bank.route.mjs";
import answerRoutes from "../routes/answer_option.route.mjs";
import resultRoutes from "../routes/result.route.mjs";
import bridgeRoutes from "../routes/bridge.route.mjs";
import invitationRoutes from "../routes/invitation.route.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const router = express.Router();

// Apply token verification middleware to all routes below
// router.use(verifyToken);

router.use("/invitation", invitationRoutes);
router.use("/department", departmentRoutes);
router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);
router.use("/examiner", examinerRoutes);
router.use("/quiz", quizRoutes);
router.use("/result", resultRoutes);
router.use("/bridge", bridgeRoutes);

export default router;
