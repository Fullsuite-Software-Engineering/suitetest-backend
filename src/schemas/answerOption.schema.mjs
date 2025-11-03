import { z } from "zod";

export const answerOptionSchema = z.object({
  answer_id: z.number().optional(),
  question_id: z.number(),
  option_text: z.string(),
});
