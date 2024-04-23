import { rateLimit } from 'express-rate-limit';
import { env } from '../env';

const expressRateLimitMiddleware = rateLimit({
  legacyHeaders: true,
  windowMs: env.RATE_LIMITER_WINDOW_MS,
  limit: env.RATE_LIMITER_LIMIT,
  standardHeaders: true
});

export { expressRateLimitMiddleware };
