import axios from 'axios';
import { Dispatch } from 'redux';
import { Register, UserType } from '../types';
import { loginApiService } from '../api-service';

export const loginAction =
  (email: string, password: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data }: { data: UserType } = await loginApiService(
        '/login',
        { email, password },
        config
      );

      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILED', payload: error.response.data });
    }
  };

export const registerAction =
  (details: Register) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data }: { data: UserType } = await axios.post(
        '/register',
        details,
        config
      );

      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILED', payload: error.response.data });
    }
  };

export const logout =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (e) {
      console.error(e);
    }
  };
