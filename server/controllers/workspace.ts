import { Request, Response } from 'express';
import { User } from '../models/models/User';
import { UserWorkspace } from '../models/models/UserWorkspace';
import { Workspace } from '../models/models/Workspace';

export async function getWorkspaces(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id }: { id: number } = req.body;
    const workspaces = await Workspace.findAll({
      include: [
        {
          model: User,
          where: { id },
        },
      ],
    });
    res.json(workspaces);
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Cannot retrieve your workspaces. Please try again.',
    });
  }
}

export async function postWorkspace(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, id }: { name: string; id: number } = req.body;

    const workspace = await Workspace.create({ name: name, createdBy: id });

    const userWorkspace = await UserWorkspace.create({
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
          model: Workspace,
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
      const response = await UserWorkspace.create({
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
