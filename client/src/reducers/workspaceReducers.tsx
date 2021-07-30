import {
  LOGOUT,
  WORKSPACE_CREATE_FAILED,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_GET_FAILED,
  WORKSPACE_GET_REQUEST,
  WORKSPACE_GET_SUCCESS,
} from '../constants/userConstant';
import { State, Action, Workspace } from '../types';
import store from '../store';

export const workspacesReducer = (
  state: Workspace | {} = {},
  action: Action
) => {
  if (action.type === WORKSPACE_GET_REQUEST)
    return {
      ...state,
      loading: true,
    };
  if (action.type === WORKSPACE_GET_SUCCESS) {
    return {
      ...state,
      loading: false,
      workspace: action.payload,
    };
  }
  if (action.type === WORKSPACE_GET_FAILED)
    return {
      loading: false,
      error: action.payload,
    };
  if (action.type === LOGOUT) return {};

  if (action.type === WORKSPACE_CREATE_REQUEST)
    return {
      ...state,
      loading: true,
    };
  if (action.type === WORKSPACE_CREATE_SUCCESS) {
    const currentState = {
      ...state,
    };

    if (currentState.workspace) {
      currentState.workspace.push(action.payload);
    } else currentState['workspace'] = [action.payload];
    return {
      ...currentState,
      loading: false,
      // workspace: action.payload,
    };
  }
  if (action.type === WORKSPACE_CREATE_FAILED)
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  return state;
};

// export const getWorkspacesReducer = (
//   state: State | {} = {},
//   action: Action
// ) => {
//   if (action.type === WORKSPACE_GET_REQUEST) return { loading: true };
//   if (action.type === WORKSPACE_GET_SUCCESS)
//     return { loading: false, workspaces: action.payload };
//   if (action.type === WORKSPACE_GET_FAILED)
//     return { loading: false, error: action.payload };
//   if (action.type === LOGOUT) return {};
//   return state;
// };

// export const postWorkspaceReducer = (
//   state: State | {} = {},
//   action: Action
// ) => {
//   if (action.type === WORKSPACE_CREATE_REQUEST) return { loading: true };
//   if (action.type === WORKSPACE_CREATE_SUCCESS)
//     return {
//       ...state,
//       loading: false,
//       workspace: action.payload,
//     };
//   if (action.type === WORKSPACE_CREATE_FAILED)
//     return {
//       ...state,
//       loading: false,
//       error: action.payload,
//     };
//   if (action.type === LOGOUT) return {};
//   return state;
// };
