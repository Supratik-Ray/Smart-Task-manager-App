import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url("Invalid URL"),
  JWT_SECRET: z.string().min(10),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables");
  console.error(z.prettifyError(result.error));
  process.exit(1);
}
const env = result.data;

export default env;
