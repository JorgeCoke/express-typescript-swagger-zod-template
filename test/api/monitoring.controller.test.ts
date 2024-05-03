import { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import { env } from '../../src/lib/env';
import { app as server } from '../../src/server';

describe('MonitoringController', () => {
  let app: Express;

  beforeAll(() => {
    app = server;
  });

  describe('GET /health', () => {
    test('returns 200 when server is up', async () => {
      const response = await request(app).get(`${env.API_BASE_PATH}/monitoring/health`).expect(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
