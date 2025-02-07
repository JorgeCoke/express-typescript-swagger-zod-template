import type { Express } from "express";
import { serve, setup } from "swagger-ui-express";
import { AuthController } from "./api/auth/auth.controller";
import { MonitoringController } from "./api/monitoring/monitoring.controller";
import { container } from "./inversify.config";
import { env } from "./lib/env";
import { buildOpenAPIDocument } from "./lib/zod-openapi/zod-openapi";
import { ErrorResponse } from "./lib/zod-openapi/zod-openapi.types";
import { basicAuthMiddleware } from "./shared/middlewares/basic-auth.middleware";
import { globalErrorHandlerMiddleware } from "./shared/middlewares/global-error-handler.middleware";

export const routes = (app: Express) => {
	const routers = [
		container.get(AuthController),
		container.get(MonitoringController),
	].map((c) => ({
		path: `${env.API_BASE_PATH}${c.routerPath}`,
		router: c.router,
	}));

	routers.forEach((e) => {
		app.use(e.path, e.router);
	});

	// Handle Swagger OpenAPI
	const doc = buildOpenAPIDocument({
		openApiVersion: "3.0.0",
		routers,
		customSchemas: [{ key: "ErrorResponse", schema: ErrorResponse }],
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		config: {
			info: {
				version: "1.0.0",
				title: "Express + Swagger + Zod API",
				description:
					"This OpenApi Swagger documentation is autogenerated from Zod Schemas!",
			},
		},
	});
	app.use(
		basicAuthMiddleware(
			env.SWAGGER_USERNAME,
			env.SWAGGER_PASSWORD,
			"swagger",
			env.SWAGGER_ENDPOINT,
		),
	);
	app.get(
		`${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}${env.SWAGGER_OPENAPI_DEF}`,
		(_req, res) => {
			res.json(doc);
		},
	);
	app.use(`${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}`, serve, setup(doc));

	// Load Global Error Middleware last
	app.use(globalErrorHandlerMiddleware);
};
