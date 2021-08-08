import { UserReducerType } from './reducers/userReducers';
import { ITask } from './views/workspace/Workspace';

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
};

export type WorkspaceType = {
  id: string;
  name: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  user?: UserType[];
};

export type Workspace = {
  loading: boolean;
  error?: Failed;
  workspace?: WorkspaceType[];
};

export type InitialState = {
  user: UserReducerType;
  workSpaces: Workspace;
  members: Members;
  tasks: ITask;
};

export type Task = {
  loading?: boolean;
  error?:
    | {
        error: string;
        message: string;
      }
    | any;
  tasks?: [{}] | any;
};

export type Members = {
  loading: boolean;
  error?:
    | {
        error: string;
        message: string;
      }
    | any;
  members?:
    | [{ id: string; firstName: string; lastName: string; email: string }]
    | any;
};

export type MemberType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  workspaces?: [{}];
};

export type currentWorkspace = {
  loading: boolean;
  error?:
    | {
        error: string;
        message: string;
      }
    | any;
  workspace?: {} | any;
};

export type Failed = {
  error: string;
  message: string;
};

export type Register = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
