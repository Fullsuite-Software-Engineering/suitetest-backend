import { z } from "zod";

export const resultsSchema = z.object({
  result_id: z.number(),
  applicant_id: z.number(),
  quiz_id: z.number(),
  score: z.number(),
  created_at: z.date().default(() => new Date()),
});
