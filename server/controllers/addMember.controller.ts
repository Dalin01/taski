import { Request, Response } from 'express';
import User from '../models/models/UserModel';
import UserTaskspace from '../models/models/UserTaskspaceModel';
import Taskspace from '../models/models/TaskspaceModel';

type AddMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function addMember(
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { taskspace, id } = req.params;
    const { memberEmail }: { memberEmail: string } = req.body;
    const user = await User.findOne({ where: { email: memberEmail } });
    if (user) {
      const existingMember = await UserTaskspace.findOne({
        where: {
          userId: user.id,
          workspaceId: id,
        },
      });
      if (existingMember) {
        return res
          .status(400)
          .send({ error: '400', message: 'Member is already in the space' });
      }

      const response = await UserTaskspace.create({
        userId: user.id,
        workspaceId: id,
      });

      const memberList: AddMember = {
        id: '' + user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.status(200).json({
        memberList: [memberList],
      });
    } else {
      res.status(400).send({
        error: '400',
        message: 'Error. User does not exit',
      });
    }
  } catch (e) {
    res.status(401).send({
      error: '401',
      message: 'Error adding member to taskspace',
    });
  }
}
