import { StatusCodes } from 'http-status-codes';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { HttpError } from '../../../shared/types/http-error';
import { UsersRepository } from '../../users/users.repository';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

vi.mock('../auth.service');

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeAll(() => {
    authService = new AuthService(new UsersRepository());
    authController = new AuthController(authService);
  });

  describe('logIn', () => {
    test('returns success with correct credentials', async () => {
      vi.mocked(authService.doLogIn).mockResolvedValue(true);
      const result = await authController.logIn({ email: 'email', password: 'password' }, {});
      expect(result).toEqual({ success: true });
    });

    test('returns an error with wrong credentials', async () => {
      vi.mocked(authService.doLogIn).mockResolvedValue(false);
      expect(() => authController.logIn({ email: 'email', password: 'password' }, {})).rejects.toThrowError(
        new HttpError(StatusCodes.NOT_FOUND, 'Invalid credentials or user not found')
      );
    });
  });
});
