import { Failed, Members } from '../types';

export interface IMembers {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export type Action = {
  type: string;
  payload: IMembers[];
  deleteId?: string;
};

export const membersReducer = (
  state: Members = { loading: false },
  action: Action
) => {
  if (action.type === 'GET_MEMBERS_REQUEST')
    return {
      loading: true,
      members: [],
    };
  if (action.type === 'ADD_MEMBERS_REQUEST')
    return {
      ...state,
      loading: true,
    };
  if (action.type === 'DELETE_MEMBERS_REQUEST')
    return {
      ...state,
      loading: true,
    };
  if (action.type === 'GET_AND_ADD_MEMBERS_SUCCESS') {
    const getMembers: IMembers[] = [];
    for (let i = 0; i < action.payload.length; i++) {
      const temp: {
        id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
      } = {};
      temp.id = action.payload[i].id;
      temp.firstName = action.payload[i].firstName;
      temp.lastName = action.payload[i].lastName;
      temp.email = action.payload[i].email;
      getMembers.push(temp);
    }
    console.log(getMembers);
    return {
      loading: false,
      members: [...state.members, ...getMembers],
      error: { error: '' },
    };
  }
  if (action.type === 'DELETE_MEMBER_REQUEST') {
    const newState: IMembers[] = [];
    state.members.forEach((value: IMembers) => {
      if (value.id !== action.deleteId) {
        newState.push(value);
      }
    });
    return {
      loading: false,
      members: newState,
      error: { error: '' },
    };
  }
  if (action.type === 'GET_MEMBERS_FAILED')
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  return state;
};
