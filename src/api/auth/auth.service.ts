import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";
import { db } from "../../lib/db/drizzle";
import { users } from "../../lib/db/schemas/users";
import { Logger } from "../../shared/logger";
import { HttpError } from "../../shared/models/types/http-error";
import type { PostLogInBodyDto, PostSignUpBodyDto } from "./auth.types";

@injectable()
export class AuthService extends Logger {
	public async logIn(body: PostLogInBodyDto): Promise<{ success: boolean }> {
		const user = await db.query.users
			.findFirst({ where: eq(users.email, body.email) })
			.execute();
		if (!user || user.email !== body.email) {
			throw new HttpError(
				StatusCodes.NOT_FOUND,
				"Invalid credentials or user not found",
			);
		}
		return { success: true };
	}

	public async signUp(body: PostSignUpBodyDto): Promise<{ success: boolean }> {
		const user = await db.query.users
			.findFirst({ where: eq(users.email, body.email) })
			.execute();
		if (user) {
			throw new HttpError(StatusCodes.CONFLICT, "User already exists");
		}
		const newUser = await db.insert(users).values(body);
		return { success: !!newUser };
	}
}
