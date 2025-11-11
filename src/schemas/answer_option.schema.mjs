import { z } from "zod";

export const answerOptionSchema = z.object({
  option_text: z.string().min(1, "Option text is required"),
  is_correct: z.boolean().default(false),
});
