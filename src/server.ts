import cors from 'cors';
import helmet from 'helmet';
import { AuthRouter } from './api/auth/auth.router';
import { container } from './inversify.config';
import { INVERSIFY_TYPES } from './inversify.types';
import { expressRateLimitMiddleware } from './shared/middlewares/express-rate-limit.middleware';
import { env } from './shared/utils/env';
import bodyParser = require('body-parser');
import compression = require('compression');
import morgan = require('morgan');
import express = require('express');

// Server
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(expressRateLimitMiddleware);
app.use(compression());
app.use(bodyParser.json());

// Load Routes
const authRouter = container.get<AuthRouter>(INVERSIFY_TYPES.AuthRouter);
const routers = [{ path: `${env.API_BASE_PATH}/auth`, router: authRouter.router }];
routers.forEach((e) => {
  app.use(e.path, e.router);
});

// TODO: Add global error handler

export { app };
