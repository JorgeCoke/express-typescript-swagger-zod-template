import { json } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { AuthRouter } from './api/auth/auth.router';
import { container } from './inversify.config';
import { INVERSIFY_TYPES } from './inversify.types';
import { expressRateLimitMiddleware } from './shared/middlewares/express-rate-limit.middleware';
import { env } from './shared/utils/env';

// Server
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(expressRateLimitMiddleware);
app.use(compression());
app.use(json({ limit: '1mb' }));

// Load Routes
const authRouter = container.get<AuthRouter>(INVERSIFY_TYPES.AuthRouter);
const routers = [{ path: `${env.API_BASE_PATH}/auth`, router: authRouter.router }];
routers.forEach((e) => {
  app.use(e.path, e.router);
});

// TODO: Add global error handler
// TODO: Add timeout interceptor (Add a timeout to every request sent by the server)

export { app };
