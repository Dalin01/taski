import bcrypt from 'bcrypt';

const saltRounds: number = 10;

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: number;
  checkUser: Function;
}

export function hashUserPass(user: IUser) {
  const hash: string = bcrypt.hashSync(user.password, saltRounds);
  const newUser = { ...user, password: hash };
  return newUser;
}
