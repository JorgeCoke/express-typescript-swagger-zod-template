import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { connection, db } from '../src/lib/drizzle/db';

(async function () {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './db/migrations' });
  // Don't forget to close the connection, otherwise the script will hang
  await connection.close();
})();
