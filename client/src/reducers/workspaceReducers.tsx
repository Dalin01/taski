import { Workspace } from '../types';

export type Action = {
  type: string;
  payload: any[];
};
export const workspacesReducer = (
  state: Workspace | {} = {},
  action: Action
) => {
  if (action.type === 'WORKSPACE_GET_REQUEST')
    return {
      ...state,
      loading: true,
    };
  if (action.type === 'WORKSPACE_GET_SUCCESS') {
    return {
      ...state,
      error: { error: '' },
      loading: false,
      workspace: action.payload,
    };
  }
  if (action.type === 'WORKSPACE_GET_FAILED')
    return {
      loading: false,
      error: action.payload,
    };
  if (action.type === 'LOGOUT') return {};

  if (action.type === 'WORKSPACE_CREATE_REQUEST')
    return {
      ...state,
      loading: true,
    };
  if (action.type === 'WORKSPACE_CREATE_SUCCESS') {
    return {
      loading: false,
      workspace: action.payload,
      error: { error: '' },
    };
  }
  if (action.type === 'WORKSPACE_CREATE_FAILED')
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

  return state;
};
