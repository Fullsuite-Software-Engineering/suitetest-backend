import { z } from "zod";

export const quizSchema = z.object({
  quiz_name: z.string().min(1, "Quiz name is required"),
  time_limit: z.number().optional(),
});
