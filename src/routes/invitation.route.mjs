import express from "express";
import {
  generateLinkInvitation,
  validateLinkInvitation,
  completeLinkInvitation,
} from "../controllers/invitation.controller.mjs";

const router = express.Router();

router.post("/generate", generateLinkInvitation);
router.get("/validate/:token", validateLinkInvitation);
router.post("/complete", completeLinkInvitation);

export default router;
