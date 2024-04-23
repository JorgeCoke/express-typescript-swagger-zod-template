import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { Injectable } from '../../shared/libs/injectable';
import { openAPIRoute } from '../../shared/libs/zod-openapi/zod-openapi-route';
import { AuthController } from './auth.controller';
import { PostLogInBodyDto, PostLogInQueryDto, PostLogInResponseDto } from './auth.types';

@injectable()
export class AuthRouter extends Injectable {
  private authController: AuthController;
  public router: Router = Router();
  public routerPath = '/auth';

  constructor(@inject(INVERSIFY_TYPES.AuthController) _authController: AuthController) {
    super();
    this.authController = _authController;
    this.mountRoutes();
  }

  public mountRoutes() {
    this.router.post(
      `/log-in`,
      openAPIRoute(
        {
          tag: this.routerPath,
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
