import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../types/http-error';

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err); // TODO: Migrate all console.logs using a logger
  if (err instanceof HttpError) {
    res.status(err.status).send({ error: err.message });
  } else {
    // Unhandled server error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
  }
};

// TODO: Check: is better to export const or default JS export
export { globalErrorHandlerMiddleware };
