import { z } from "zod";

export const questionBankSchema = z.object({
  question_id: z.number().optional(),
  quiz_id: z.number(),
  question_text: z.string(),
  question_type: z.string(),
  points: z.number().default(1),
});
