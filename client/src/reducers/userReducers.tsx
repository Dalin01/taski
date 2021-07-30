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

export const loginReducers = (state: State | {} = {}, action: Action) => {
  if (action.type === LOGIN_REQUEST) return { loading: true };
  if (action.type === LOGIN_SUCCESS)
    return { loading: false, user: action.payload };
  if (action.type === LOGIN_FAILED)
    return { loading: false, error: action.payload };
  if (action.type === LOGOUT) return {};
  return state;
};

export const registerReducers = (state: State | {} = {}, action: Action) => {
  if (action.type === REGISTER_REQUEST) return { loading: true };
  if (action.type === REGISTER_SUCCESS)
    return { loading: false, user: action.payload };
  if (action.type === REGISTER_FAILED)
    return { loading: false, error: action.payload };
  if (action.type === LOGOUT) return {};
  return state;
};
