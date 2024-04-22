import express, { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import { HttpError } from '../../types/http-error';
import { basicAuthMiddleware } from '../basic-auth.middleware';
import { expressRateLimitMiddleware } from '../express-rate-limit.middleware';
import { globalErrorHandlerMiddleware } from '../global-error-handler.middleware';

describe('Middlewares', () => {
  let app: Express;

  describe('basicAuthMiddleware', () => {
    const username = 'username';
    const password = 'password';
    const basicAuthEndpoint = '/basic-auth';

    beforeAll(() => {
      app = express();
      app.use(basicAuthMiddleware(username, password, 'test', basicAuthEndpoint));
      app.get(basicAuthEndpoint, (_req, res) => {
        res.status(200).json({ success: 'ok' });
      });
    });

    test('returns unauthroized when no authentication is provided', async () => {
      await request(app).get(basicAuthEndpoint).expect(401);
    });

    test('returns ok when authentication is provided', async () => {
      const credentials = Buffer.from(`${username}:${password}`).toString('base64');
      await request(app)
        .get(basicAuthEndpoint)
        .set({ authorization: `Basic ${credentials}` })
        .expect(200);
    });
  });

  describe('expressRateLimitMiddleware', () => {
    beforeAll(() => {
      app = express();
      app.use(expressRateLimitMiddleware);
      app.get('/', (_req, res) => {
        res.status(200).json({ success: 'ok' });
      });
    });

    test('returns unauthroized if limit is triggered', async () => {
      for (let i = 0; i < 60; i++) {
        await request(app).get('/').expect(200);
      }
      await request(app).get('/').expect(429);
    });
  });

  describe('globalErrorHandlerMiddleware', () => {
    beforeAll(() => {
      app = express();
      app.get('/error', (_req, _res) => {
        throw new HttpError(StatusCodes.BAD_REQUEST, 'Bad Request');
      });
      app.get('/unhandled-error', (_req, _res) => {
        throw new Error('Unhandled error');
      });
      app.use(globalErrorHandlerMiddleware);
    });

    test('handles error when custom http error is thrown', async () => {
      const response = await request(app).get('/error').expect(400);
      expect(response.body).toEqual({ error: 'Bad Request' });
    });

    test('throws Internal Server Error when exception is not handled', async () => {
      const response = await request(app).get('/unhandled-error').expect(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});
