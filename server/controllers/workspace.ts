import { Request, Response } from 'express';

export async function workspace(req: Request, res: Response): Promise<void> {
  try {
    res.json(req.body);
  } catch (e) {
    res
      .status(401)
      .send({ error: '401', message: 'Email or password is incorrect' });
  }
}
