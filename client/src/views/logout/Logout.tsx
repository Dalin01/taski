import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actionCreators/userAction';

const Logout = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { user }: { user: State } = userLogin;

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
