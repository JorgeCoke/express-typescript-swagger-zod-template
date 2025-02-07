import { connection, db } from "./drizzle";
import { type InsertUser, users } from "./schemas/users";

(async () => {
	const insertUsers: InsertUser[] = [
		{ id: "1", email: "user1@test.com", password: "user1" },
		{ id: "2", email: "user2@test.com", password: "user2" },
	];
	for (const user of insertUsers) {
		await db.insert(users).values(user);
	}
	await connection.close();
})();
