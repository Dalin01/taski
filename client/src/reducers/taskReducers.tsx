import {
  POST_TASK_FAILED,
  POST_TASK_REQUEST,
  POST_TASK_SUCCESS,
  LOGOUT,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILED,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILED,
} from '../constants/userConstant';
import { Task } from '../types';
import { Action } from '../types';

export const taskReducers = (state: Task = {}, action: Action) => {
  if (
    action.type === POST_TASK_REQUEST ||
    action.type === GET_TASK_REQUEST ||
    action.type === EDIT_TASK_REQUEST
  ) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === POST_TASK_SUCCESS) {
    return {
      ...state,
      loading: false,
      tasks: [...state.tasks, action.payload],
    };
  }

  if (action.type === GET_TASK_SUCCESS) {
    console.log(state);

    if (state.tasks)
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, ...action.payload],
      };
    else
      return {
        ...state,
        loading: false,
        tasks: [...action.payload],
      };
  }

  if (action.type === EDIT_TASK_SUCCESS) {
    const currentState = [...state.tasks];

    for (let i = 0; i < currentState.length; i++) {
      if (currentState[i].id === action.payload.id) {
        currentState[i] = action.payload;
      }
    }
    return {
      ...state,
      loading: false,
      tasks: [...currentState],
    };
  }

  if (action.type === POST_TASK_FAILED)
    return {
      loading: false,
      error: action.payload,
    };

  if (action.type === GET_TASK_FAILED)
    return {
      loading: false,
      error: action.payload,
    };

  if (action.type === EDIT_TASK_FAILED)
    return {
      loading: false,
      error: action.payload,
    };

  if (action.type === LOGOUT) return {};
  return state;
};
