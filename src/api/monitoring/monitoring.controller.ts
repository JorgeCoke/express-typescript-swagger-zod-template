import { Router } from "express";
import { injectable } from "inversify";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { Injectable } from "../../shared/injectable";
import { GetHealthResponseDto } from "./monitoring.types";

@injectable()
export class MonitoringController extends Injectable {
	public router: Router = Router();
	public routerPath = "/monitoring";

	constructor() {
		super();
		this.mountRoutes();
	}

	public mountRoutes() {
		this.router.get(
			"/health",
			openAPIRoute(
				{
					tag: this.routerPath,
					summary: "Health check",
					response: GetHealthResponseDto,
				},
				(_req, _res) => ({ status: "ok" }),
			),
		);
	}
}
