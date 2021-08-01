import { Dispatch } from 'redux';
import {
  WORKSPACE_GET_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAILED,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILED,
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
