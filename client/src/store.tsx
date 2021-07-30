import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducers, registerReducers } from './reducers/userReducers';
import {
  // getWorkspacesReducer,
  // postWorkspaceReducer,
  workspacesReducer,
} from './reducers/workspaceReducers';
import { Workspace } from './types';

const reducer = combineReducers({
  userLogin: loginReducers,
  userRegister: registerReducers,
  // getWorkspaces: getWorkspacesReducer,
  // postWorkspace: postWorkspaceReducer,
  workSpaces: workspacesReducer,
});

const getUserFromLocalStorage: typeof JSON.parse | null = localStorage.getItem(
  'user'
)
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState = {
  userLogin: { user: getUserFromLocalStorage },
  userRegister: { user: getUserFromLocalStorage },
  workSpaces: { loading: false, workspace: [{}] },
  // getWorkspaces: [],
  // postWorkspace: {},
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
