import { z } from 'zod';

// Define the schema for environment variables
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

export const parseEnv = (env: NodeJS.ProcessEnv = process.env): Env => {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', z.treeifyError(parsed.error));
    process.exit(1);
  }

  return parsed.data;
};
