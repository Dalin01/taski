import { UserType, Failed } from '../types';

export type UserReducerType = {
  loading: boolean;
  user: UserType;
  error: Failed;
};

export type Action = {
  type: string;
  payload: UserType[];
};

export const userReducer = (
  state: UserReducerType | {} = {},
  action: Action
) => {
  if (action.type === 'LOGIN_REQUEST') return { ...state, loading: true };
  if (action.type === 'LOGIN_SUCCESS') {
    return {
      ...state,
      loading: false,
      user: action.payload,
      error: { error: '' },
    };
  }
  if (action.type === 'LOGIN_FAILED')
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  if (action.type === 'LOGOUT') return {};
  if (action.type === 'REGISTER_REQUEST') return { ...state, loading: true };
  if (action.type === 'REGISTER_SUCCESS')
    return {
      ...state,
      loading: false,
      user: action.payload,
      error: { error: '' },
    };
  if (action.type === 'REGISTER_FAILED')
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  return state;
};
