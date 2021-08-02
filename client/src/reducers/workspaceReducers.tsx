import {
  GET_MEMBERS_FAILED,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  LOGOUT,
  WORKSPACE_CREATE_FAILED,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_GET_FAILED,
  WORKSPACE_GET_REQUEST,
  WORKSPACE_GET_SUCCESS,
} from '../constants/userConstant';
import { Action, Workspace, Members } from '../types';

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

export const membersReducer = (state: Members | {} = {}, action: Action) => {
  if (action.type === GET_MEMBERS_REQUEST)
    return {
      ...state,
      loading: true,
    };
  if (action.type === GET_MEMBERS_SUCCESS) {
    const getMembers = [];
    for (let i = 0; i < action.payload.length; i++) {
      const temp: {
        id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
      } = {};
      temp.id = action.payload[i].id;
      temp.firstName = action.payload[i].firstName;
      temp.lastName = action.payload[i].lastName;
      temp.email = action.payload[i].email;
      getMembers.push(temp);
    }
    return {
      ...state,
      loading: false,
      members: getMembers,
    };
  }
  if (action.type === GET_MEMBERS_FAILED)
    return {
      loading: false,
      error: action.payload,
    };
  return state;
};
