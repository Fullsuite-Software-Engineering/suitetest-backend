import { z } from "zod";

export const invitationSchema = z
  .object({
    expiration: z.union([z.string(), z.number()]),
  })
  .loose();
