import { injectable } from "inversify";
import { Controller } from "../../lib/models/classes/controller";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { GetHealthDto } from "./monitoring.dtos";

@injectable()
export class MonitoringController extends Controller {
	readonly routerPath = "/monitoring";

	public mountRoutes() {
		this.router.get(
			"/health",
			openAPIRoute(
				{
					summary: "Health check",
					...GetHealthDto,
				},
				() => ({ status: "ok" }),
			),
		);
	}
}
