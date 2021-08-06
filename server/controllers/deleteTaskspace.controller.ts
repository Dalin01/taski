import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function deleteTaskspace(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    // Taskspace
    const { taskspace } = req.params;
    const { id }: { id: number } = req.body;
    let space = await Taskspace.findOne({
      where: { name: taskspace, createdBy: id },
    });

    if (!space) {
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot find taskspace.',
      });
    }

    let userSpace = await UserTaskspace.findOne({
      where: { userId: id, workspaceId: space.id },
    });
    if (!userSpace) {
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot find taskspace.',
      });
    }

    await space.destroy();
    await userSpace.destroy();

    space = await Taskspace.findOne({
      where: { name: taskspace, createdBy: id },
    });
    if (!space) {
      return res.status(200).send({
        message: 'Taskspace has been removed',
      });
    } else
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot find taskspace.',
      });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Failed. Cannot delete taskspace',
    });
  }
}
