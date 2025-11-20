import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { parseEnv } from '@playground/env';

import * as schema from './schema';

const { DATABASE_URL } = parseEnv(process.env);

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });

export * from './schema';
