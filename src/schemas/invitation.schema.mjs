import { z } from "zod";

export const invitationSchema = z
  .object({
    email: z.email(),
    expiration: z.union([z.string(), z.number()]),
  })
  .loose();
