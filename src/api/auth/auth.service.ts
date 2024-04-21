import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { UsersRepository } from '../users/users.repository';
import { PostLogInBodyDto } from './auth.types';

@injectable()
export class AuthService {
  private usersRepository: UsersRepository;

  constructor(@inject(INVERSIFY_TYPES.UsersRepository) _usersRepository: UsersRepository) {
    this.usersRepository = _usersRepository;
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  public async doLogIn(body: PostLogInBodyDto) {
    const user = this.usersRepository.getUserByEmail(body.email);
    return user != null && user.password === body.password;
  }
}
