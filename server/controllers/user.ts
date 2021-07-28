import { User } from '../models/models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateToken from './generateToken';

export async function register(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(409)
        .json({ error: '409', message: 'User already exists' });
    }

    const newUser = await User.create(req.body);

    let accessToken: null | string = null;
    if (process.env.SECRETE_KEY) {
      const { id } = newUser;

      accessToken = generateToken(id);
      console.log(newUser, accessToken);
    }
    res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      token: accessToken,
    });
  } catch (e) {
    res.status(400).json({ error: e, message: 'Could not create user' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res
        .status(401)
        .send({ error: '401', message: 'Email or password is incorrect' });
    }
  } catch (e) {
    res
      .status(401)
      .send({ error: '401', message: 'Email or password is incorrect' });
  }
}
