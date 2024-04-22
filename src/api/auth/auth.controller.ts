import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { HttpError } from '../../shared/types/http-error';
import { AuthService } from './auth.service';
import { PostLogInBodyDto, PostLogInQueryDto, PostLogInResponseDto } from './auth.types';

@injectable()
export class AuthController {
  private authService: AuthService;

  constructor(@inject(INVERSIFY_TYPES.AuthService) _authService: AuthService) {
    this.authService = _authService;
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  public async logIn(body: PostLogInBodyDto, query: PostLogInQueryDto): Promise<PostLogInResponseDto> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate slow http request
    console.log({ query }); // Query Example
    const success = await this.authService.doLogIn(body);
    if (!success) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Invalid credentials or user not found');
    }
    return { success };
  }
}
