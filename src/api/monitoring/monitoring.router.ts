import { Router } from 'express';
import { injectable } from 'inversify';
import { openAPIRoute } from '../../shared/libs/zod-openapi/zod-openapi-route';
import { GetHealthResponseDto } from './monitoring.types';

@injectable()
export class MonitoringRouter {
  public router: Router = Router();
  public routerPath = '/monitoring';

  constructor() {
    this.mountRoutes();
    console.log(`🔂 ${this.constructor.name} singleton built`);
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
