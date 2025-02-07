import type { Logger as PinoLogger } from "pino";
import { logger } from "../lib/pino-logger";

export class Logger {
	protected logger: PinoLogger;

	constructor() {
		this.logger = logger.child({ location: this.constructor.name });
		this.logger.info(`🔂 ${this.constructor.name} singleton built`);
	}
}
