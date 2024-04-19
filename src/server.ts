import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { expressRateLimitMiddleware } from './shared/middlewares/express-rate-limit.middleware';
import { env } from './shared/utils/env';

const app: Express = express();

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(expressRateLimitMiddleware);

export { app };
