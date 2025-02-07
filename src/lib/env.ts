import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
	// Environment Configuration
	NODE_ENV: z
		.union([
			z.literal("development"),
			z.literal("production"),
			z.literal("test"),
		])
		.default("development"),
	PORT: z.coerce.number().min(1000),
	HOST: z.string().min(1),
	API_BASE_PATH: z.string().min(1).startsWith("/"),
	TIMEOUT_MS: z.coerce.number().min(1000),
	// CORS Settings
	CORS_ORIGIN: z.string().min(1),
	// Swagger
	SWAGGER_USERNAME: z.string().min(1),
	SWAGGER_PASSWORD: z.string().min(1),
	SWAGGER_ENDPOINT: z.string().min(1).startsWith("/"),
	SWAGGER_OPENAPI_DEF: z.string().min(1).startsWith("/"),
	// Log Retention
	LOG_PATH: z.string().min(1),
	LOG_INTERVAL: z.string().min(1),
	LOG_MAX_FILES: z.coerce.number().min(1),
	LOG_MAX_SIZE: z.string().min(1),
	// Rate Limiter
	RATE_LIMITER_WINDOW_MS: z.coerce.number().min(1000),
	RATE_LIMITER_LIMIT: z.coerce.number().min(1),
});

const env = envSchema.parse(process.env);

export { env };
