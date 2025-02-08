import { beforeAll, describe, expect, test } from "vitest";
import { UsersRepository } from "../../../../src/api/users/users.repository";
import type { InsertUser } from "../../../../src/lib/db/schemas/users";
import { ROLE } from "../../../../src/lib/models/enums/role";

const insertUserMock: InsertUser = {
	email: "email@email.com",
	password: "password",
	enabled: true,
	role: ROLE.USER,
};

describe("UsersRepository", () => {
	let usersRepository: UsersRepository;

	beforeAll(() => {
		usersRepository = new UsersRepository();
	});

	describe("findOne", () => {
		test("return user when user is found", async () => {
			const result = await usersRepository.findOne({ email: "user1@test.com" });
			expect(result).toMatchObject({ email: "user1@test.com" });
		});

		test("return undefined when user is not found", async () => {
			const result = await usersRepository.findOne({ email: "not_found" });
			expect(result).toEqual(undefined);
		});
	});

	describe("insert", () => {
		test("return database result when insert is successful", async () => {
			const result = await usersRepository.insert(insertUserMock);
			expect(result.changes).toEqual(1);
		});
	});
});
