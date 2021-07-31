import './style.css';
import Image from '../image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { State, Failed } from '../../types';
import Members from '../members/Members';

const Sidebar = () => {
  const userLogin = useSelector((state: any) => state.user);
  const {
    loading,
    error,
    user,
  }: { loading: Boolean; error: Failed; user: State } = userLogin;

  return (
    <>
      <div className="d-none d-md-block py-3 px-2">
        {user && <Image name={`${user.firstName} ${user.lastName}`} />}
        <Members />
      </div>
    </>
  );
};

export default Sidebar;
