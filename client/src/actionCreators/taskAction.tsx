import { Dispatch } from 'redux';
import {
  WORKSPACE_GET_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAILED,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILED,
  POST_TASK_REQUEST,
  POST_TASK_SUCCESS,
  POST_TASK_FAILED,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILED,
} from '../constants/userConstant';
import axios from 'axios';

type Details = {
  workspaceName: string;
  workspaceId: string;
  userEmail: string;
};

export const addTeamMember =
  (details: Details, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: WORKSPACE_GET_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put('/addMember', details, config);

      dispatch({ type: WORKSPACE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: WORKSPACE_CREATE_FAILED,
        payload: error.response.data,
      });
    }
  };

type Info = {
  userEmail: string;
  userId: string;
  userToken?: string;
};

export const getMembers =
  (details: any, userData: Info) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: GET_MEMBERS_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.userToken}`,
        },
      };

      delete userData['userToken'];
      details.userData = userData;
      const { data } = await axios.post('/getMembers', details, config);
      const { users } = data;
      dispatch({ type: GET_MEMBERS_SUCCESS, payload: users });
    } catch (error) {
      dispatch({
        type: GET_MEMBERS_FAILED,
        payload: error.response.data,
      });
    }
  };

type TaskDetails = {
  assignedTo: string;
  task: string;
  date: string;
  token?: string;
  createdBy: string;
  workspaceId: string;
  workspaceName: String;
};

export const addTask =
  (details: TaskDetails) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: POST_TASK_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${details.token}`,
        },
      };
      delete details['token'];
      const { data } = await axios.post('/addTask', details, config);
      dispatch({ type: POST_TASK_SUCCESS, payload: data.dataValues });
    } catch (error) {
      dispatch({
        type: POST_TASK_FAILED,
        payload: error.response.data,
      });
    }
  };

type GetTask = {
  token?: string;
  workspaceId: string;
};
export const getTasks =
  (details: GetTask) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: GET_TASK_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${details.token}`,
        },
      };
      delete details['token'];
      const { data } = await axios.post('/getTasks', details, config);
      dispatch({ type: GET_TASK_SUCCESS, payload: data.dataValues });
    } catch (error) {
      dispatch({
        type: GET_TASK_FAILED,
        payload: error.response.data,
      });
    }
  };
