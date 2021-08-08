import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import { workspacesReducer } from './reducers/workspaceReducers';
import { membersReducer } from './reducers/membersReducer';
import { taskReducers } from './reducers/taskReducers';
import { UserType } from './types';
import { IMembers } from './reducers/membersReducer';

const reducer = combineReducers({
  user: userReducer,
  workSpaces: workspacesReducer,
  members: membersReducer,
  tasks: taskReducers,
});

const getUserFromLocalStorage: typeof JSON.parse | null = localStorage.getItem(
  'user'
)
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const storeuser: UserType = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  token: '',
  ...getUserFromLocalStorage,
};

const member: IMembers[] = [];
export const initialState = {
  user: { loading: false, user: storeuser, error: false },
  workSpaces: { loading: false, workspace: [{}] },
  members: { loading: false, members: member, error: { error: '' } },
  tasks: { loading: false, tasks: [{}] },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
