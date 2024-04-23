import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../inversify.types';
import { Injectable } from '../../shared/libs/injectable';
import { UsersRepository } from '../users/users.repository';
import { PostLogInBodyDto } from './auth.types';

@injectable()
export class AuthService extends Injectable {
  private usersRepository: UsersRepository;

  constructor(@inject(INVERSIFY_TYPES.UsersRepository) _usersRepository: UsersRepository) {
    super();
    this.usersRepository = _usersRepository;
  }

  public async doLogIn(body: PostLogInBodyDto) {
    this.logger.info(body, 'asd');
    const user = this.usersRepository.getUserByEmail(body.email);
    return user != null && user.password === body.password;
  }
}
