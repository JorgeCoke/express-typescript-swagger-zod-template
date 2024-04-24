import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { Injectable } from '../../lib/injectable';
import { HttpError } from '../../shared/types/http-error';
import { AuthService } from './auth.service';
import { PostLogInBodyDto, PostLogInQueryDto, PostLogInResponseDto } from './auth.types';

@injectable()
export class AuthController extends Injectable {
  private authService: AuthService;

  constructor(@inject(INVERSIFY_TYPES.AuthService) _authService: AuthService) {
    super();
    this.authService = _authService;
  }

  public async logIn(body: PostLogInBodyDto, query: PostLogInQueryDto): Promise<PostLogInResponseDto> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate slow http request
    this.logger.info({ query }); // Query Example
    const success = await this.authService.doLogIn(body);
    if (!success) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Invalid credentials or user not found');
    }
    return { success };
  }
}
