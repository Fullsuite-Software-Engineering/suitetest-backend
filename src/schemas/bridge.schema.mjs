import { z } from "zod";

export const bridgeSchema = z.object({
  bridge_id: z.number().optional(),
  applicant_id: z.number(),
  quiz_id: z.number(),
  result_id: z.number(),
});
