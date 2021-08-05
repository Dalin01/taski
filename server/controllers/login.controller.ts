import { User } from '../models/models/User';
import { Request, Response } from 'express';
import generateToken from './generateToken';

type BodyRequest = {
  email: string;
  password: string;
};

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  getFullname: Function;
}

export async function login(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { email, password }: BodyRequest = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user.id);
      if (!accessToken) {
        return res.status(501).json({
          error: '501',
          message: 'There was an error. Please try again.',
        });
      }

      const userResponse: IUser = {
        id: String(user.id),
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        token: accessToken,
        getFullname: function () {
          return `${this.firstname} ${this.lastname}`;
        },
      };

      res.status(200).json(userResponse);
    } else {
      res.status(401).send({
        error: '401',
        message: 'User does not exit. Please register.',
      });
    }
  } catch (e) {
    res
      .status(401)
      .send({ error: '401', message: 'Email or password is incorrect' });
  }
}
