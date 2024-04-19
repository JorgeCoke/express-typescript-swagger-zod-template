import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { AuthService } from './auth.service';
import { LogInBodyDto, LogInResponseDto } from './auth.types';

@injectable()
export class AuthController {
  private authService: AuthService;

  constructor(@inject(INVERSIFY_TYPES.AuthService) _authService: AuthService) {
    this.authService = _authService;
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  public async logIn(body: LogInBodyDto): Promise<LogInResponseDto> {
    const success = await this.authService.doLogIn(body);
    return { success };
  }
}
