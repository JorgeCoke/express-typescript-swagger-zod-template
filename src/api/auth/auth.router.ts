import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { AuthController } from './auth.controller';

@injectable()
export class AuthRouter {
  private authController: AuthController;
  public router: Router = Router();

  constructor(@inject(INVERSIFY_TYPES.AuthController) _authController: AuthController) {
    this.authController = _authController;
    this.mountRoutes();
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  public mountRoutes() {
    // TODO: Add Zod validator + Swagger Doc
    this.router.post(`/log-in`, async (req, res) => {
      const result = await this.authController.logIn(req.body);
      return res.status(200).json(result);
    });
  }
}
