import { Request, Response } from 'express';
import Task from '../models/models/TaskModel';

export async function editTask(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const {
      id,
      task,
      assignedTo,
      createdBy,
      deadline,
      status,
      workspaceName,
      workspaceId,
      taskId,
    } = req.body;

    const foundTask = await Task.findOne({ where: { id: taskId } });
    if (!foundTask) {
      const newTask = await Task.create({
        task,
        assignedTo,
        createdBy,
        deadline,
        status,
        workspaceId,
        workspaceName,
      });
      res.status(201).json({
        ...newTask,
      });
    } else {
      if (foundTask.task !== task) foundTask.task = task;
      if (foundTask.assignedTo !== assignedTo)
        foundTask.assignedTo = assignedTo;
      if (foundTask.deadline !== deadline) foundTask.deadline = deadline;
      if (foundTask.status !== status) foundTask.status = status;
      const oldTask = await foundTask.save();
      res.status(201).json({
        ...oldTask,
      });
    }
  } catch (e) {
    res.status(401).json({ error: e, message: 'Cannot updated.' });
  }
}
