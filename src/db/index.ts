import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

// will check that all env variables are defined
const envVariables = z.object({
  DATABASE_URL: z.string().nonempty(),
});
const env = envVariables.parse(process.env);

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

export default db;
