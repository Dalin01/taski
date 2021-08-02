import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../constants/userConstant';
import { State, Action } from '../types';

export const userReducer = (state: State | {} = {}, action: Action) => {
  if (action.type === LOGIN_REQUEST) return { loading: true };
  if (action.type === LOGIN_SUCCESS)
    return {
      ...state,
      loading: false,
      user: action.payload,
    };
  if (action.type === LOGIN_FAILED)
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  if (action.type === LOGOUT) return {};
  if (action.type === REGISTER_REQUEST) return { loading: true };
  if (action.type === REGISTER_SUCCESS)
    return {
      ...state,
      loading: false,
      user: action.payload,
    };
  if (action.type === REGISTER_FAILED)
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  return state;
};
