import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../models/classes/http-error";
import { logger } from "../pino-logger";

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	logger.error(err);
	if (err instanceof HttpError) {
		res.status(err.status).send({ error: err.message });
	} else {
		// Unhandled server error
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({ error: "Internal Server Error" });
	}
};

export { globalErrorHandlerMiddleware };
