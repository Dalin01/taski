import User from '../models/models/UserModel';
import { Request, Response } from 'express';
import generateToken from './generateToken';

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  getFullname: Function;
}

export async function register(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { email }: { email: string } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(409).json({
        error: '409',
        message: 'User already exists. Please sign in.',
      });
    }

    const newUser = await User.create(req.body);

    let accessToken: undefined | string = undefined;

    if (process.env.SECRETE_KEY) {
      const { id } = newUser;
      accessToken = generateToken(id);
    }

    if (accessToken === undefined) {
      return res.status(501).json({
        error: '501',
        message: 'There was an error. Please try again.',
      });
    }

    const userResponse: IUser = {
      id: String(newUser.id),
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      email: newUser.email,
      token: accessToken,
      getFullname: function () {
        return `${this.firstname} ${this.lastname}`;
      },
    };

    res.status(201).json(userResponse);
  } catch (e) {
    res.status(400).json({
      error: '400',
      message: 'Could not create user',
    });
  }
}
