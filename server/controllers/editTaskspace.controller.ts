import { Request, Response } from 'express';
import Taskspace from '../models/models/TaskspaceModel';

export async function editTaskspace(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { taskspace } = req.params;
    const { id, newName }: { id: number; newName: string } = req.body;
    const space = await Taskspace.findOne({
      where: { name: taskspace, createdBy: id },
    });
    if (space) {
      space.name = newName;
      const result = await space.save();
      res.status(201).json(result);
    } else
      res.status(401).send({ error: '401', message: 'Name does not exit.' });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Failed. Cannot update name.',
    });
  }
}
