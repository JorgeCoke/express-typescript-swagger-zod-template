import { injectable } from 'inversify';
import { Injectable } from '../../shared/libs/injectable';
import { User } from './users.types';

@injectable()
export class UsersRepository extends Injectable {
  private readonly users: User[] = [{ id: 1, email: 'test@test.com', password: 'test' }];

  constructor() {
    super();
  }

  public getUserByEmail(email: string) {
    return this.users.find((e) => e.email === email);
  }
}
