import { Task } from '../types';
import { TaskDetails } from '../components/workspaceTopicContainer/TaskContainer';

export const taskReducers = (state: Task = {}, action: any) => {
  if (
    action.type === 'POST_TASK_REQUEST' ||
    action.type === 'GET_TASK_REQUEST' ||
    action.type === 'EDIT_TASK_REQUEST' ||
    action.type === 'DELETE_TASK_REQUEST'
  ) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === 'POST_TASK_SUCCESS') {
    return {
      ...state,
      loading: false,
      tasks: [...state.tasks, action.payload],
    };
  }

  if (action.type === 'GET_TASK_SUCCESS') {
    return {
      ...state,
      loading: false,
      tasks: [...action.payload],
    };
  }

  if (action.type === 'DELETE_TASK_SUCCESS') {
    const newState: TaskDetails[] = [];
    state.tasks.forEach((value: TaskDetails) => {
      console.log(value.id, action.payload, 'Test.......');
      if (String(value.id) !== String(action.payload)) {
        newState.push(value);
      }
    });
    return {
      loading: false,
      tasks: newState,
      error: { error: '' },
    };
  }

  if (action.type === 'EDIT_TASK_SUCCESS') {
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

  if (
    action.type === 'POST_TASK_FAILED' ||
    action.type === 'GET_TASK_FAILED' ||
    action.type === 'EDIT_TASK_FAILED' ||
    action.type === 'DELETE_TASK_FAILED'
  )
    return {
      loading: false,
      error: action.payload,
    };

  if (action.type === 'LOGOUT') return {};
  return state;
};
