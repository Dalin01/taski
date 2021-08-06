import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function getMembers(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { taskspace, id } = req.params;
    const users = await User.findAll({
      include: [
        {
          model: Taskspace,
          attributes: ['name', 'createdBy'],
          where: {
            name: taskspace,
            id: id,
          },
        },
      ],
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });

    res.status(200).json({
      membersList: users,
    });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Error getting member list.',
    });
  }
}
