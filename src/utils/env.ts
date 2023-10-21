import { z } from "zod";

const envSchema = z.object({
  DROPBOX_APP_KEY: z.string(),
});

const processEnv: Partial<z.infer<typeof envSchema>> = {
  DROPBOX_APP_KEY: process.env.NEXT_PUBLIC_DROPBOX_APP_KEY,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) throw new Error("Invalid environment variables");

const env = envSchema.parse(processEnv);

export default env;
