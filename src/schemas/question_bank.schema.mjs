import { z } from "zod";

export const questionBankSchema = z.object({
  question_text: z.string().min(1, "Question is required"),
  question_type: z.enum(["MC", "CB", "TF", "DESC"]),
  points: z.number().default(1),
  explanation: z.string().optional(),
});
