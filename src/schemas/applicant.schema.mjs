import { z } from "zod";

export const applicantSchema = z.object({
  applicant_id: z.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
});
