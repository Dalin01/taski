import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducers, registerReducers } from './reducers/userReducers';
import {
  getWorkspacesReducer,
  postWorkspaceReducer,
} from './reducers/workspaceReducers';

const reducer = combineReducers({
  userLogin: loginReducers,
  userRegister: registerReducers,
  getWorkspaces: getWorkspacesReducer,
  postWorkspace: postWorkspaceReducer,
});

const getUserFromLocalStorage: string | null = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState = {
  userLogin: { user: getUserFromLocalStorage },
  userRegister: { user: getUserFromLocalStorage },
  getWorkspaces: [],
  postWorkspace: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
