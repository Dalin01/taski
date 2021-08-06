import { Request, Response } from 'express';
import Task from '../models/models/TaskModel';

export async function getTasks(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { workspaceId } = req.params;
    const tasks = await Task.findAll({
      where: {
        workspaceId: Number(workspaceId),
      },
    });
    res.status(200).json({
      tasks,
    });
  } catch (e) {
    res.status(400).json({ error: '400', message: 'Cannot get tasks.' });
  }
}
