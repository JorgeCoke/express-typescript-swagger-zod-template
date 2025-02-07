import { injectable } from "inversify";
import type { Logger } from "pino";
import { logger } from "../lib/pino-logger";

@injectable()
export class Injectable {
	protected logger: Logger;

	constructor() {
		this.logger = logger.child({ location: this.constructor.name });
		this.logger.info(`🔂 ${this.constructor.name} singleton built`);
	}
}
