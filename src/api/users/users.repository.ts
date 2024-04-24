import { eq } from 'drizzle-orm';
import { injectable } from 'inversify';
import { users } from '../../../db/schemas/users';
import { db } from '../../lib/drizzle';
import { Injectable } from '../../lib/injectable';

@injectable()
export class UsersRepository extends Injectable {
  constructor() {
    super();
  }

  public getUserByEmail(email: string) {
    return db.query.users.findFirst({ where: eq(users.email, email) }).execute();
  }
}
