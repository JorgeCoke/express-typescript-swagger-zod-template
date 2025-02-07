import { Router } from "express";
import { Logger } from "./logger";

export abstract class Controller extends Logger {
	public router: Router = Router();
	abstract readonly routerPath: string;
	abstract mountRoutes(): void;

	constructor() {
		super();
		this.mountRoutes();
	}
}
