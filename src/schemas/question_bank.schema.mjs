import { z } from "zod";

export const questionBankSchema = z.object({
  question_id: z.number().optional(),
  quiz_id: z.number(),
  question_text: z.string(),
  question_type: z.enum(["MC", "CB", "TF", "DESC"]),
  points: z.number(),
  explanation: z.string(),
});
