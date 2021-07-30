import {
  LOGOUT,
  WORKSPACE_REQUEST,
  WORKSPACE_SUCCESS,
  WORKSPACE_FAILED,
} from '../constants/userConstant';
import { State, Action } from '../types';

export const getWorkspacesReducer = (
  state: State | {} = {},
  action: Action
) => {
  if (action.type === WORKSPACE_REQUEST) return { loading: true };
  if (action.type === WORKSPACE_SUCCESS)
    return { loading: false, user: action.payload };
  if (action.type === WORKSPACE_FAILED)
    return { loading: false, error: action.payload };
  if (action.type === LOGOUT) return {};
  return state;
};

export const postWorkspaceReducer = (
  state: State | {} = {},
  action: Action
) => {
  if (action.type === WORKSPACE_REQUEST) return { loading: true };
  if (action.type === WORKSPACE_SUCCESS)
    return { loading: false, user: action.payload };
  if (action.type === WORKSPACE_FAILED)
    return { loading: false, error: action.payload };
  if (action.type === LOGOUT) return {};
  return state;
};
