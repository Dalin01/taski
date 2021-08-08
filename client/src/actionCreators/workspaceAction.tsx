import axios from 'axios';
import { Dispatch } from 'redux';

export const createWorkspace =
  (name: string, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'WORKSPACE_CREATE_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        '/taskspace',
        { taskspace: name },
        config
      );

      dispatch({ type: 'WORKSPACE_CREATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'WORKSPACE_CREATE_FAILED',
        payload: error.response.data,
      });
    }
  };

export const getWorkspaces =
  (token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'WORKSPACE_GET_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.post('/workspaces', { id }, config);
      const { data } = await axios.get('/taskspace', config);

      dispatch({ type: 'WORKSPACE_GET_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'WORKSPACE_GET_FAILED', payload: error.response.data });
    }
  };
