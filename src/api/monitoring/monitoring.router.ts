import { Router } from 'express';
import { injectable } from 'inversify';
import { Injectable } from '../../libs/injectable';
import { openAPIRoute } from '../../libs/zod-openapi/zod-openapi-route';
import { GetHealthResponseDto } from './monitoring.types';

@injectable()
export class MonitoringRouter extends Injectable {
  public router: Router = Router();
  public routerPath = '/monitoring';

  constructor() {
    super();
    this.mountRoutes();
  }

  public mountRoutes() {
    this.router.get(
      `/health`,
      openAPIRoute(
        {
          tag: this.routerPath,
          summary: 'Health check',
          response: GetHealthResponseDto
        },
        (_req, _res) => ({ status: 'ok' })
      )
    );
  }
}
