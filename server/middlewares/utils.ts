import { User } from '../models/models/User';
import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export function hashUserPass(user: User) {
  if (user.password === '' || user.email === '') throw new Error();
  const hash: string = bcrypt.hashSync(user.password, saltRounds);
  const newUser = { ...user, password: hash };
  return newUser;
}
