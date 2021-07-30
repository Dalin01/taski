import {
  WORKSPACE_FAILED,
  WORKSPACE_REQUEST,
  WORKSPACE_SUCCESS,
} from '../constants/userConstant';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Register, State } from '../types';

export const createWorkspace =
  (name: string, id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: WORKSPACE_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/workspace', { name, id }, config);

      dispatch({ type: WORKSPACE_SUCCESS, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: WORKSPACE_FAILED, payload: error.response.data });
    }
  };

export const getWorkspaces =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: WORKSPACE_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/workspaces', { id }, config);

      dispatch({ type: WORKSPACE_SUCCESS, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: WORKSPACE_FAILED, payload: error.response.data });
    }
  };
