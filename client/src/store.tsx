import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import {
  workspacesReducer,
  membersReducer,
} from './reducers/workspaceReducers';
import { taskReducers } from './reducers/taskReducers';

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

const initialState = {
  user: { user: getUserFromLocalStorage },
  workSpaces: { loading: false, workspace: [{}] },
  members: { loading: false, members: [{}] },
  tasks: { loading: false, tasks: [{}] },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
