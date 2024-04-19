import { injectable } from 'inversify';
import { User } from './users.types';

@injectable()
export class UsersRepository {
  private readonly users: User[] = [{ id: 1, email: 'test@test.com', password: 'test' }];

  constructor() {
    console.log(`🔂 ${this.constructor.name} singleton built`);
  }

  public getUserByEmail(email: string): User {
    return this.users.find((e) => e.email === email);
  }
}
