import type { Config } from 'drizzle-kit';
import { env } from './src/lib/env';

export default {
  schema: './src/lib/drizzle/schemas/*',
  out: './db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: `db.${env.NODE_ENV}.sqlite`
  }
} satisfies Config;
