import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sessions } from '../../db/schemas/sessions';
import { users } from '../../db/schemas/users';
import { env } from './env';

const connection = new Database(`db.${env.NODE_ENV}.sqlite`);
const db = drizzle(connection, { logger: env.NODE_ENV === 'development', schema: { users, sessions } });

export { connection, db };
