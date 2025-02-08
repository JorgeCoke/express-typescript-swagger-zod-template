import express, { type Express } from "express";
import request from "supertest";
import { beforeAll, describe, test } from "vitest";
import { expressRateLimitMiddleware } from "../../../../src/lib/middlewares/express-rate-limit.middleware";

describe("ExpressRateLimitMiddleware", () => {
	let app: Express;

	describe("ExpressRateLimitMiddleware", () => {
		beforeAll(() => {
			app = express();
			app.use(expressRateLimitMiddleware);
			app.get("/", (_req, res) => {
				res.status(200).json({ success: "ok" });
			});
		});

		test("returns unauthroized if limit is triggered", async () => {
			for (let i = 0; i < 60; i++) {
				await request(app).get("/").expect(200);
			}
			await request(app).get("/").expect(429);
		});
	});
});
