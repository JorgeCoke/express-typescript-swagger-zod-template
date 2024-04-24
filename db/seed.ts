import { connection, db } from '../src/lib/drizzle';
import { InsertUser, users } from './schemas/users';

(async function () {
  const insertUsers: InsertUser[] = [
    { id: '1', email: 'user1@test.com' },
    { id: '2', email: 'user2@test.com' }
  ];
  for (const user of insertUsers) {
    await db.insert(users).values(user);
  }
  await connection.close();
})();
