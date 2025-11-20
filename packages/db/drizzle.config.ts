import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import { parseEnv } from '@playground/env';

const { DATABASE_URL } = parseEnv(process.env);

export default defineConfig({
  out: './migrations',
  schema: './schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
