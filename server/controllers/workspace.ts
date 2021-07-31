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

export async function getWorkspace(
  req: Request,
  res: Response
): Promise<void> {}
