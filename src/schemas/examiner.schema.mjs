import { z } from "zod";

export const examinerSchema = z.object({
  examiner_id: z.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  created_at: z.date().default(() => new Date()),
});
