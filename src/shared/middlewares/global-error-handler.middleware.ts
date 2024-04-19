import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // TODO: Migrate all console.logs using a logger
  console.error(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
};

// TODO: Check: is better to export const or default JS export
export { globalErrorHandlerMiddleware };
