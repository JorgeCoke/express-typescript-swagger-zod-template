import type { Express } from "express";
import request from "supertest";
import { beforeAll, describe, expect, test } from "vitest";
import { env } from "../../src/lib/env";
import { app as server } from "../../src/server";

describe("AuthController", () => {
	let app: Express;

	beforeAll(() => {
		app = server;
	});

	describe("POST /log-in", () => {
		test("returns 200 when login is successful", async () => {
			const response = await request(app)
				.post(`${env.API_BASE_PATH}/auth/log-in`)
				.send({ email: "user1@test.com", password: "user1" })
				.expect(200);
			expect(response.body).toEqual({ success: true });
		});

		test("returns 404 when login is not successful (user not found)", async () => {
			const response = await request(app)
				.post(`${env.API_BASE_PATH}/auth/log-in`)
				.send({ email: "bad_email@test.com", password: "bad_credentials" })
				.expect(404);
			expect(response.body).toEqual({
				error: "Invalid credentials or user not found",
			});
		});

		test("returns 404 when login is not successful (wrong password)", async () => {
			const response = await request(app)
				.post(`${env.API_BASE_PATH}/auth/log-in`)
				.send({ email: "user1@test.com", password: "wrong_password" })
				.expect(404);
			expect(response.body).toEqual({
				error: "Invalid credentials or user not found",
			});
		});

		test("returns 400 when body is not valid", async () => {
			const response = await request(app)
				.post(`${env.API_BASE_PATH}/auth/log-in`)
				.send({ email: "not an email", password: "bad_credentials" })
				.expect(400);
			expect(response.body).toEqual({ error: "email: Invalid email" });
		});
	});
});
