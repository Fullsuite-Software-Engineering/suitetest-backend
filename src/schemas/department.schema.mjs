import { z } from "zod";

export const departmentSchema = z.object({
  dept_name: z.string().min(1, "Department name is required."),
  is_active: z.boolean().default(true),
});
