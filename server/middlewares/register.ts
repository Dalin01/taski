import { NextFunction, Request, Response } from 'express';
import { hashUserPass } from './utils';

export async function registerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = { ...req.body };
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    req.body = hashUserPass(user);
    next();
  } catch (e) {
    console.error(e);
  }
}
