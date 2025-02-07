import { injectable } from "inversify";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { Controller } from "../../shared/controller";
import { GetHealthResponseDto } from "./monitoring.types";

@injectable()
export class MonitoringController extends Controller {
	readonly routerPath = "/monitoring";

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
