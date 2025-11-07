import { z } from "zod";

export const resultSchema = z.object({
  result_id: z.number().optional(),
  examiner_id: z.number(),
  quiz_id: z.number(),
  score: z.number(),
  status: z.enum(["COMPLETED", "ABANDONED"]),
  created_at: z.date().default(() => new Date()),
});
