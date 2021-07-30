import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  WORKSPACE_REQUEST,
  WORKSPACE_SUCCESS,
  WORKSPACE_FAILED,
} from './constants/userConstant';

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
  | { type: typeof WORKSPACE_REQUEST }
  | { type: typeof WORKSPACE_SUCCESS; payload: State }
  | { type: typeof WORKSPACE_FAILED; payload: Failed };

export type Register = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
