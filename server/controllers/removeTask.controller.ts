import { Request, Response } from 'express';
import Task from '../models/models/TaskModel';

export async function removeTask(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { taskspace, id } = req.params;
    let task = await Task.findOne({
      where: { workspaceName: taskspace, id: id },
    });

    if (!task) {
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot delete task',
      });
    }
    await task.destroy();
    task = await Task.findOne({
      where: { workspaceName: taskspace, id: id },
    });
    if (!task) {
      return res.status(200).send({
        taskId: id,
      });
    } else
      return res.status(404).send({
        error: '404',
        message: 'Error. Cannot delete task.',
      });
  } catch (e) {
    res.status(400).json({ error: e, message: 'Cannot delete task.' });
  }
}
