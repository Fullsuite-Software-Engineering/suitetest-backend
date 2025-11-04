import { z } from "zod";

export const quizSchema = z.object({
  quiz_id: z.number().optional(),
  dept_id: z.number(),
  quiz_name: z.string(),
  time_limit: z.number(),
});
