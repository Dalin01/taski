import { Request, Response } from 'express';
import Task from '../models/models/TaskModel';

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
      status: 'OPEN',
      workspaceId: req.body.workspaceId,
      workspaceName: req.body.workspaceName,
    };
    const newTask = await Task.create(data);
    const {
      id,
      task,
      assignedTo,
      createdBy,
      deadline,
      status,
      workspaceId,
      workspaceName,
      updatedAt,
      createdAt,
    } = newTask;

    res.status(201).json({
      id,
      task,
      assignedTo,
      createdBy,
      deadline,
      status,
      workspaceId,
      workspaceName,
      updatedAt,
      createdAt,
    });
  } catch (e) {
    res.status(400).json({ error: e, message: 'Cannot create task.' });
  }
}
