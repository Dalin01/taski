import jwt from 'jsonwebtoken';
import User from '../models/models/UserModel';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeaders = req.headers.authorization;
    if (authHeaders && authHeaders.startsWith('Bearer')) {
      const token = authHeaders.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY!);
        if (typeof decoded !== 'string') {
          const { id } = decoded;
          const user = await User.findOne({ where: { id } });
          if (user) {
            req.body = {
              ...req.body,
              id: user.id,
              email: user.email,
              firstname: user.firstName,
              lastname: user.lastName,
            };
          }
        }
      } catch (e) {
        res.status(401);
      }
    } else {
      res.status(403);
    }
    next();
  } catch (e) {
    console.error(e);
  }
}
