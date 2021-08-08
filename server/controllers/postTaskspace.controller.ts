import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function postTaskspace(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { taskspace, id }: { taskspace: string; id: number } = req.body;
    const space = await Taskspace.findOne({
      where: { name: taskspace, createdBy: id },
    });
    if (space && space.name) {
      return res.status(409).json({
        error: '409',
        message: 'Taskspace already exist. Please rename and try again.',
      });
    }

    const taskSpace = await Taskspace.create({
      name: taskspace,
      createdBy: id,
    });

    await UserTaskspace.create({
      userId: id,
      workspaceId: taskSpace.id,
    });

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

    res.status(201).json(taskspaces);
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Failed. Cannot create workspace. Please try again.',
    });
  }
}
