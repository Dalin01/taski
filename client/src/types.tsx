import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAILED,
  WORKSPACE_GET_FAILED,
  WORKSPACE_GET_REQUEST,
  WORKSPACE_GET_SUCCESS,
} from './constants/userConstant';

export type Workspace = {
  loading: boolean;
  error?:
    | {
        error: string;
        message: string;
      }
    | any;
  workspace?: [{}] | any;
};

export type State = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type Failed = {
  error: string;
  message: string;
};

export type Action =
  | { type: typeof LOGIN_REQUEST }
  | { type: typeof LOGIN_SUCCESS; payload: State }
  | { type: typeof LOGIN_FAILED; payload: Failed }
  | { type: typeof LOGOUT }
  | { type: typeof REGISTER_REQUEST }
  | { type: typeof REGISTER_SUCCESS; payload: State }
  | { type: typeof REGISTER_FAILED; payload: Failed }
  | { type: typeof WORKSPACE_CREATE_REQUEST }
  | { type: typeof WORKSPACE_CREATE_SUCCESS; payload: any }
  | { type: typeof WORKSPACE_CREATE_FAILED; payload: Failed }
  | { type: typeof WORKSPACE_GET_REQUEST }
  | { type: typeof WORKSPACE_GET_SUCCESS; payload: any }
  | { type: typeof WORKSPACE_GET_FAILED; payload: Failed };

export type Register = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};