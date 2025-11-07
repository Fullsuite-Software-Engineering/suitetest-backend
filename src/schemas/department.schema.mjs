import { z } from "zod";

export const departmentSchema = z.object({
  dept_id: z.number().optional(),
  dept_name: z.string(),
  is_active: z.boolean().default(true),
});
