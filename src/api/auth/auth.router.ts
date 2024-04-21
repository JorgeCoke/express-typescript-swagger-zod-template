import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { openAPIRoute } from '../../shared/utils/zod-openapi/zod-openapi-route';
import { AuthController } from './auth.controller';
import { PostLogInBodyDto, PostLogInQueryDto, PostLogInResponseDto } from './auth.types';

@injectable()
export class AuthRouter {
  private authController: AuthController;
  public router: Router = Router();
  public routerPath = '/auth';

  constructor(@inject(INVERSIFY_TYPES.AuthController) _authController: AuthController) {
    this.authController = _authController;
    this.mountRoutes();
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  // TODO: Add health check
  public mountRoutes() {
    this.router.post(
      `/log-in`,
      openAPIRoute(
        {
          tag: 'Auth',
          summary: 'Log-in user',
          description: 'Log-in into the service with user credentials',
          query: PostLogInQueryDto,
          body: PostLogInBodyDto,
          response: PostLogInResponseDto
        },
        async (req, _res) => this.authController.logIn(req.body, req.query)
      )
    );
  }
}
