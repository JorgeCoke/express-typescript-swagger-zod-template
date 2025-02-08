import express, { type Express } from "express";
import request from "supertest";
import { beforeAll, describe, test } from "vitest";
import { basicAuthMiddleware } from "../../../../src/lib/middlewares/basic-auth.middleware";

describe("BasicAuthMiddleware", () => {
	let app: Express;

	describe("BasicAuthMiddleware", () => {
		const username = "username";
		const password = "password";
		const basicAuthEndpoint = "/basic-auth";

		beforeAll(() => {
			app = express();
			app.use(
				basicAuthMiddleware(username, password, "test", basicAuthEndpoint),
			);
			app.get(basicAuthEndpoint, (_req, res) => {
				res.status(200).json({ success: "ok" });
			});
		});

		test("returns unauthroized when no authentication is provided", async () => {
			await request(app).get(basicAuthEndpoint).expect(401);
		});

		test("returns ok when authentication is provided", async () => {
			const credentials = Buffer.from(`${username}:${password}`).toString(
				"base64",
			);
			await request(app)
				.get(basicAuthEndpoint)
				.set({ authorization: `Basic ${credentials}` })
				.expect(200);
		});
	});
});
