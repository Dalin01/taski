import {
  WORKSPACE_CREATE_FAILED,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_GET_FAILED,
  WORKSPACE_GET_REQUEST,
  WORKSPACE_GET_SUCCESS,
} from '../constants/userConstant';
import axios from 'axios';
import { Dispatch } from 'redux';

export const createWorkspace =
  (name: string, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: WORKSPACE_CREATE_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('/taskspace', { name }, config);

      dispatch({ type: WORKSPACE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: WORKSPACE_CREATE_FAILED, payload: error.response.data });
    }
  };

export const getWorkspaces =
  (token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: WORKSPACE_GET_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.post('/workspaces', { id }, config);
      const { data } = await axios.get('/taskspaces', config);

      dispatch({ type: WORKSPACE_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: WORKSPACE_GET_FAILED, payload: error.response.data });
    }
  };
