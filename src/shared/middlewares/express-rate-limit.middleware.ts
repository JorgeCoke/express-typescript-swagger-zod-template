import { rateLimit } from 'express-rate-limit';

// TODO: Add windowMs and limit to .env
const expressRateLimitMiddleware = rateLimit({
  legacyHeaders: true,
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true
});

export { expressRateLimitMiddleware };
