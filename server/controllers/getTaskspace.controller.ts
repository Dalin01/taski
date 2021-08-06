import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function getTaskspace(req: Request, res: Response): Promise<void> {
  try {
    const { id }: { id: number } = req.body;
    const taskspaces = await Taskspace.findAll({
      include: [
        {
          model: User,
          where: { id },
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(200).json(taskspaces);
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Unauthorized.',
    });
  }
}
