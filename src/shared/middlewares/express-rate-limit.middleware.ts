import { rateLimit } from 'express-rate-limit';
import { env } from '../utils/env';

const expressRateLimitMiddleware = rateLimit({
  legacyHeaders: true,
  windowMs: env.RATE_LIMITER_WINDOW_MS,
  limit: env.RATE_LIMITER_LIMIT,
  standardHeaders: true
});

// TODO: Check: is better to export const or default JS export
export { expressRateLimitMiddleware };
