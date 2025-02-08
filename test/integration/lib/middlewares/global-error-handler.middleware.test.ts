import express, { type Express } from "express";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, test } from "vitest";
import { globalErrorHandlerMiddleware } from "../../../../src/lib/middlewares/global-error-handler.middleware";
import { HttpError } from "../../../../src/lib/models/classes/http-error";

describe("GlobalErrorHandlerMiddleware", () => {
	let app: Express;

	describe("GlobalErrorHandlerMiddleware", () => {
		beforeAll(() => {
			app = express();
			app.get("/error", (_req, _res) => {
				throw new HttpError(StatusCodes.BAD_REQUEST, "Bad Request");
			});
			app.get("/unhandled-error", (_req, _res) => {
				throw new Error("Unhandled error");
			});
			app.use(globalErrorHandlerMiddleware);
		});

		test("handles error when custom http error is thrown", async () => {
			const response = await request(app).get("/error").expect(400);
			expect(response.body).toEqual({ error: "Bad Request" });
		});

		test("throws Internal Server Error when exception is not handled", async () => {
			const response = await request(app).get("/unhandled-error").expect(500);
			expect(response.body).toEqual({ error: "Internal Server Error" });
		});
	});
});
