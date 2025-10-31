import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  //Database
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().default("3306"),

  //JWT TOKEN
  JWT_TOKEN: z.string(),

  // HRIS API
  HRIS_API_URL: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
