import { NextFunction, Request, Response } from 'express';
import { hashUserPass } from '../utils';

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: number;
  checkUser: Function;
}

export async function registerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUser = {
      ...req.body,
      createdAt: Date.now(),
      checkUser: function () {
        if (this.email === '' || !this.email) {
          return false;
        }
        return true;
      },
    };
    if (user.checkUser()) req.body = hashUserPass(user);
    else res.status(400);
    next();
  } catch (e) {
    console.error(e);
  }
}
