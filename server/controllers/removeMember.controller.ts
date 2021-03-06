import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function deleteMember(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id, memberId } = req.params;

    let userTaskspace = await UserTaskspace.findOne({
      where: { userId: memberId, workspaceId: id },
    });

    if (!userTaskspace) {
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot remove member from the taskspace',
      });
    }

    await userTaskspace.destroy();

    res.status(200).send({
      status: '200',
      id: memberId,
    });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Failed. Cannot remove member',
    });
  }
}
