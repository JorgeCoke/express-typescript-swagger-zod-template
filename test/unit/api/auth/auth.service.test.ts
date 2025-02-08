import { StatusCodes } from "http-status-codes";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { AuthService } from "../../../../src/api/auth/auth.service";
import { UsersRepository } from "../../../../src/api/users/users.repository";
import type { User } from "../../../../src/lib/db/schemas/users";
import { HttpError } from "../../../../src/lib/models/classes/http-error";
import { ROLE } from "../../../../src/lib/models/enums/role";

vi.mock("../../../../src/api/users/users.repository");

const userMock: User = {
	id: "1",
	email: "email@email.com",
	password: "password",
	enabled: true,
	role: ROLE.USER,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("AuthService", () => {
	let usersRepository: UsersRepository;
	let authService: AuthService;

	beforeAll(() => {
		usersRepository = new UsersRepository();
		authService = new AuthService(usersRepository);
	});

	describe("logIn", () => {
		test("returns true when login is successful", async () => {
			vi.mocked(usersRepository.findOne).mockResolvedValue(userMock);
			const result = await authService.logIn({
				email: userMock.email,
				password: userMock.password,
			});
			expect(result).toBeTruthy();
		});

		test(`returns ${StatusCodes.NOT_FOUND} when login is wrong`, async () => {
			vi.mocked(usersRepository.findOne).mockResolvedValue(undefined);
			expect(
				async () =>
					await authService.logIn({
						email: userMock.email,
						password: userMock.password,
					}),
			).rejects.toThrowError(
				new HttpError(
					StatusCodes.NOT_FOUND,
					"Invalid credentials or user not found",
				),
			);
		});
	});

	describe("signUp", () => {
		test("returns true when signup is successful", async () => {
			vi.mocked(usersRepository.findOne).mockResolvedValue(undefined);
			vi.mocked(usersRepository.insert).mockResolvedValue({
				changes: 1,
				lastInsertRowid: -1,
			});
			const result = await authService.signUp({
				email: "new_email@email.com",
				password: "new_password",
			});
			expect(result).toBeTruthy();
		});

		test(`returns ${StatusCodes.CONFLICT} when login is wrong`, async () => {
			vi.mocked(usersRepository.findOne).mockResolvedValue(userMock);
			expect(
				async () =>
					await authService.signUp({
						email: userMock.email,
						password: userMock.password,
					}),
			).rejects.toThrowError(
				new HttpError(StatusCodes.CONFLICT, "User already exists"),
			);
		});
	});
});
