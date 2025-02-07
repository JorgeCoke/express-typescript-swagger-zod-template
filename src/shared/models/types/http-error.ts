import type { StatusCodes } from "http-status-codes";

class HttpError extends Error {
	status: StatusCodes;

	constructor(status: StatusCodes, message: string) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
	}
}

export { HttpError };
