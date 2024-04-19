import { json } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import { AuthRouter } from './api/auth/auth.router';
import { container } from './inversify.config';
import { INVERSIFY_TYPES } from './inversify.types';
import { expressRateLimitMiddleware } from './shared/middlewares/express-rate-limit.middleware';
import { globalErrorHandlerMiddleware } from './shared/middlewares/global-error-handler.middleware';
import { env } from './shared/utils/env';
require('express-async-errors');

// Server
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(expressRateLimitMiddleware);
app.use(compression());
app.use(json({ limit: '1mb' }));

// Log Retention
const accessLogStream = createStream('access.log', {
  path: env.LOG_PATH,
  interval: env.LOG_INTERVAL,
  maxFiles: Number(env.LOG_MAX_FILES),
  size: env.LOG_MAX_SIZE
});
app.use(morgan('common', { stream: accessLogStream }));

// Load Routes
const authRouter = container.get<AuthRouter>(INVERSIFY_TYPES.AuthRouter);
const routers = [{ path: `${env.API_BASE_PATH}/auth`, router: authRouter.router }];
routers.forEach((e) => {
  app.use(e.path, e.router);
});

// Load Global Error Middleware last
app.use(globalErrorHandlerMiddleware);

export { app };
