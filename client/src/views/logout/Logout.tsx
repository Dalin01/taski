import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../types';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actionCreators/userAction';
import { InitialState } from '../login/Login';

const Logout = () => {
  const dispatch = useDispatch();
  const { user }: { user: UserType } = useSelector(
    (state: InitialState) => state.user
  );

  const history = useHistory();
  useEffect(() => {
    if (user) {
      dispatch(logout());
      history.push('/login');
    }
  }, [user, history, dispatch]);

  return <></>;
};

export default Logout;
