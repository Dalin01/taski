import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

export async function getWorkspaces(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id }: { id: number } = req.body;
    const workspaces = await Taskspace.findAll({
      include: [
        {
          model: User,
          where: { id },
        },
      ],
    });
    res.status(200).json(workspaces);
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Cannot retrieve your workspaces. Please sign in and try again.',
    });
  }
}

export async function postWorkspace(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, id }: { name: string; id: number } = req.body;

    const workspace = await Taskspace.create({ name, createdBy: id });

    const userWorkspace = await UserTaskspace.create({
      userId: id,
      workspaceId: workspace.id,
    });

    res.status(201).json({
      ...req.body,
      ...workspace,
      ...userWorkspace,
    });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Failed. Cannot create workspace. Please try again.',
    });
  }
}

export async function getMembers(req: Request, res: Response): Promise<void> {
  try {
    const { name } = req.body;
    const users = await User.findAll({
      include: [
        {
          model: Taskspace,
          where: {
            name,
          },
        },
      ],
    });

    res.status(200).json({
      users: users,
    });
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Error getting member list.',
    });
  }
}

export async function addMember(req: Request, res: Response): Promise<void> {
  try {
    const { workspaceId, id, userEmail } = req.body;
    const user = await User.findOne({ where: { email: userEmail } });
    if (user) {
      const response = await UserTaskspace.create({
        userId: user.id,
        workspaceId: workspaceId,
      });
      res.status(200).json({
        response,
      });
    } else {
      throw new Error('Member could not be added to workspace');
    }
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Error adding member to workspace',
    });
  }
}
