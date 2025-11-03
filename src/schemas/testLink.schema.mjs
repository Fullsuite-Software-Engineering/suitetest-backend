import { z } from "zod";

export const testLinkSchema = z.object({
  link_id: z.number().optional(),
  applicant_id: z.number(),
  quiz_id: z.number(),
  unique_token: z.string(),
  ip_address: z.string(),
  issued_at: z.date().default(() => new Date()),
  expires_at: z.date(),
  is_used: z.boolean().default(false),
  used_at: z.date(),
  status: z.string().default("active"),
});
