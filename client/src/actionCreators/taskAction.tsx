import { Dispatch } from 'redux';
import axios from 'axios';
import { Members, MemberType, WorkspaceType } from '../types';
import { TaskDetails as TaskDetail } from '../components/workspaceTopicContainer/TaskContainer';

export const removeTeamMember =
  (details: any, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'DELETE_MEMBERS_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `/members/${details.result.name}/${details.result.id}/${details.dataValue}`,
        config
      );

      console.log(data);
      if (data.status === '200') {
        dispatch({ type: 'DELETE_MEMBER_REQUEST', deleteId: data.id });
      }
    } catch (error) {
      dispatch({
        type: 'GET_MEMBERS_FAILED',
        payload: error.response.data,
      });
    }
  };

type Details = {
  workspaceName: string;
  workspaceId: string;
  userEmail: string;
  result: WorkspaceType;
};

export const addTeamMember =
  (details: Details, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'ADD_MEMBERS_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/members/${details.result.name}/${details.result.id}`,
        { memberEmail: details.userEmail },
        config
      );
      const { membersList } = data;
      if (data.memberList)
        dispatch({
          type: 'GET_AND_ADD_MEMBERS_SUCCESS',
          payload: data.memberList,
        });
    } catch (error) {
      dispatch({
        type: 'GET_MEMBERS_FAILED',
        payload: error.response.data,
      });
    }
  };

type Info = {
  userEmail: string;
  userId: string;
  userToken?: string;
};

type Data = {
  membersList: MemberType[];
};

export const getMembers =
  (details: WorkspaceType, userData: Info) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'GET_MEMBERS_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.userToken}`,
        },
      };

      const { data }: { data: Data } = await axios.get(
        `/members/${details.name}/${details.id}`,
        config
      );
      const { membersList } = data;
      console.log(membersList);
      dispatch({ type: 'GET_AND_ADD_MEMBERS_SUCCESS', payload: membersList });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_MEMBERS_FAILED',
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
  workspaceName: string;
};

export const addTask =
  (details: TaskDetails) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'POST_TASK_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${details.token}`,
        },
      };
      delete details['token'];
      const { data } = await axios.post(
        `/tasks/${details.workspaceId}`,
        details,
        config
      );
      dispatch({ type: 'POST_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'POST_TASK_FAILED',
        payload: error.response.data,
      });
    }
  };

type GetTask = {
  token?: string;
  workspaceId: string;
  workspaceName: string;
};
export const getTasks =
  (details: GetTask) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'GET_TASK_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${details.token}`,
        },
      };
      const { data } = await axios.get(`/tasks/${details.workspaceId}`, config);

      dispatch({ type: 'GET_TASK_SUCCESS', payload: data.tasks });
    } catch (error) {
      dispatch({
        type: 'GET_TASK_FAILED',
        payload: error.response.data,
      });
    }
  };

type EditDetails = {
  assignedTo: string;
  task: string;
  deadline: string;
  token?: string;
  createdBy: string;
  workspaceId: string;
  workspaceName: string;
  status: string;
  id: string;
  taskId?: string;
};
export const editCurrentTask =
  (details: EditDetails) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'EDIT_TASK_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${details.token}`,
        },
      };
      delete details['token'];
      const { data } = await axios.put(
        `/tasks/${details.workspaceName}/${details.id}`,
        details,
        config
      );
      dispatch({ type: 'EDIT_TASK_SUCCESS', payload: data.dataValues });
    } catch (error) {
      dispatch({
        type: 'EDIT_TASK_FAILED',
        payload: error.response.data,
      });
    }
  };

export const deleteCurrentTask =
  (details: TaskDetail, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: 'DELETE_TASK_REQUEST' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `/tasks/${details.workspaceName}/${details.id}`,
        config
      );

      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: data.taskId });
    } catch (error) {
      dispatch({
        type: 'DELETE_TASK_FAILED',
        payload: error.response.data,
      });
    }
  };
