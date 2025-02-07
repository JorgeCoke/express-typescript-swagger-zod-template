import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import type { z } from "zod";
import { db } from "../../lib/db/drizzle";
import { users } from "../../lib/db/schemas/users";
import { HttpError } from "../../lib/models/classes/http-error";
import { Logger } from "../../lib/models/classes/logger";
import { UsersRepository } from "../users/users.repository";
import type { PostLogInDto, PostSignUpDto } from "./auth.dtos";

@injectable()
export class AuthService extends Logger {
	constructor(
		@inject(UsersRepository) private readonly usersRepository: UsersRepository,
	) {
		super();
	}

	public async logIn(body: z.infer<typeof PostLogInDto.body>) {
		const user = await this.usersRepository.findOne({ email: body.email });
		if (!user || user.password !== body.password) {
			throw new HttpError(
				StatusCodes.NOT_FOUND,
				"Invalid credentials or user not found",
			);
		}
		return { success: true };
	}

	public async signUp(body: z.infer<typeof PostSignUpDto.body>) {
		const user = await this.usersRepository.findOne({ email: body.email });
		if (user) {
			throw new HttpError(StatusCodes.CONFLICT, "User already exists");
		}
		const newUser = await db.insert(users).values(body);
		return { success: !!newUser };
	}
}
