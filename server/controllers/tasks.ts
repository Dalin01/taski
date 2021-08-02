// import { Request, Response } from 'express';
// import { Task } from '../models/models/Task';

// export async function addTask(
//   req: Request,
//   res: Response
// ): Promise<void | Response<any, Record<string, any>>> {
//   // try {
//   //   console.log(req.body, 'hello');
//   //   const data = {
//   //     task: req.body.task,
//   //     assignedTo: req.body.assignedTo,
//   //     createdBy: req.body.createdBy,
//   //     deadline: req.body.date,
//   //     status: 'open',
//   //     workspaceId: req.body.workspaceId,
//   //     workspaceName: req.body.workspaceName,
//   //   };
//   //   console.log(data);
//   //   const newTask = await Task.create(data);
//   //   console.log(newTask);
//   //   res.status(201).json({
//   //     ...newTask,
//   //   });
//   // } catch (e) {
//   //   res.status(400).json({ error: e, message: 'Cannot create task.' });
//   // }
// }
