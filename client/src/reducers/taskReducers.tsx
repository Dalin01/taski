import {
  POST_TASK_FAILED,
  POST_TASK_REQUEST,
  POST_TASK_SUCCESS,
  LOGOUT,
} from '../constants/userConstant';
import { Task } from '../types';
import { Action } from '../types';

export const taskReducers = (state: Task = {}, action: Action) => {
  if (action.type === POST_TASK_REQUEST)
    return {
      ...state,
      loading: true,
    };
  if (action.type === POST_TASK_SUCCESS) {
    return {
      ...state,
      loading: false,
      tasks: [...state.tasks, action.payload],
    };
  }
  if (action.type === POST_TASK_FAILED)
    return {
      loading: false,
      error: action.payload,
    };
  if (action.type === LOGOUT) return {};
  return state;
};
