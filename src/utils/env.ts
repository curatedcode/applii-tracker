import { z } from "zod";

const envSchema = z.object({
	DROPBOX_APP_KEY: z.string(),
	APP_URL: z.string(),
});

const processEnv: Partial<z.infer<typeof envSchema>> = {
	DROPBOX_APP_KEY: process.env.NEXT_PUBLIC_DROPBOX_APP_KEY,
	APP_URL:
		process.env.NODE_ENV === "production"
			? process.env.NEXT_PUBLIC_APP_URL
			: process.env.NEXT_PUBLIC_TESTING_APP_URL,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) throw new Error("Invalid environment variables");

const env = envSchema.parse(processEnv);

export default env;
