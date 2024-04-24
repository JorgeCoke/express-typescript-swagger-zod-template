import { beforeAll, describe, expect, test } from 'vitest';
import { UsersRepository } from '../../users/users.repository';

describe('AuthService', () => {
  let usersRepository: UsersRepository;

  beforeAll(() => {
    usersRepository = new UsersRepository();
  });

  describe('getUserByEmail', () => {
    test('returns user when user is found', async () => {
      const result = await usersRepository.getUserByEmail('user1@test.com');
      expect(result).toEqual({ id: '1', email: 'user1@test.com' });
    });

    test('returns undefined when user is not found', async () => {
      const result = await usersRepository.getUserByEmail('not_found');
      expect(result).toEqual(undefined);
    });
  });
});
