import { Request, Response } from 'express';
import { Task } from '../models/models/Task';
import { Workspace } from '../models/models/Workspace';

export async function addTask(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const data = {
      task: req.body.task,
      assignedTo: req.body.assignedTo,
      createdBy: req.body.createdBy,
      deadline: req.body.date,
      status: 'open',
      workspaceId: req.body.workspaceId,
      workspaceName: req.body.workspaceName,
    };
    const newTask = await Task.create(data);
    res.status(201).json({
      ...newTask,
    });
  } catch (e) {
    res.status(400).json({ error: e, message: 'Cannot create task.' });
  }
}

export async function getTasks(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { id } = req.body.workspaceId;
    const tasks = await Task.findAll({
      include: [
        {
          model: Workspace,
          where: {
            id,
          },
        },
      ],
    });

    res.status(200).json({
      ...tasks,
    });
  } catch (e) {
    res.status(400).json({ error: e, message: 'Cannot get tasks.' });
  }
}
