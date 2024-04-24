import { beforeAll, describe, expect, test, vi } from 'vitest';
import { UsersRepository } from '../../users/users.repository';
import { AuthService } from '../auth.service';

vi.mock('../../users/users.repository');

describe('AuthService', () => {
  let usersRepository: UsersRepository;
  let authService: AuthService;

  beforeAll(() => {
    usersRepository = new UsersRepository();
    authService = new AuthService(usersRepository);
  });

  describe('doLogIn', () => {
    test('returns true when login is successful', async () => {
      vi.mocked(usersRepository.getUserByEmail).mockResolvedValue({ id: '1', email: 'email' });
      const result = await authService.doLogIn({ email: 'email', password: 'password' });
      expect(result).toBeTruthy();
    });

    test('returns false when login is wrong', async () => {
      vi.mocked(usersRepository.getUserByEmail).mockResolvedValue(undefined);
      const result = await authService.doLogIn({ email: 'email', password: 'password' });
      expect(result).toBeFalsy();
    });
  });
});
