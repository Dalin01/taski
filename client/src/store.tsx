import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducers, registerReducers } from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: loginReducers,
  userRegister: registerReducers,
});

const getUserFromLocalStorage: string | null = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState = {
  userLogin: { user: getUserFromLocalStorage },
  userRegister: { user: getUserFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
