import { json } from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import { env } from "./lib/env";
import { expressRateLimitMiddleware } from "./lib/middlewares/express-rate-limit.middleware";
import { router } from "./router";
require("express-async-errors");

// Server
const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(expressRateLimitMiddleware);
app.use(compression());
app.use(json({ limit: "1mb" }));

// Log Retention
const accessLogStream = createStream("access.log", {
	path: env.LOG_PATH,
	interval: env.LOG_INTERVAL,
	maxFiles: env.LOG_MAX_FILES,
	size: env.LOG_MAX_SIZE,
});
app.use(morgan("common", { stream: accessLogStream }));

// Load Routes
router(app);

export { app };
