import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { db } from "../../lib/db/drizzle";
import { users } from "../../lib/db/schemas/users";
import { Logger } from "../../lib/models/classes/logger";

@injectable()
export class UsersRepository extends Logger {
	public async findOne(query: { email: string }) {
		return await db.query.users
			.findFirst({ where: eq(users.email, query.email) })
			.execute();
	}
}
