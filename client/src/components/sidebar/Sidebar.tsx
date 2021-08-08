import './style.css';
import Image from '../image/Image';
import { useSelector } from 'react-redux';
import { Failed, UserType, WorkspaceType } from '../../types';
import Members from '../members/Members';
import { InitialState } from '../../views/login/Login';

const Sidebar = ({
  createdBy,
  currentTaskspace,
}: {
  createdBy: string;
  currentTaskspace: WorkspaceType;
}) => {
  const userLogin = useSelector((state: InitialState) => state.user);
  const { user }: { loading: Boolean; error: Failed; user: UserType } =
    userLogin;

  return (
    <>
      <div className="d-none d-md-block py-3 px-2">
        {user && <Image name={`${user.firstname} ${user.lastname}`} />}
        <Members createdBy={createdBy} currentTaskspace={currentTaskspace} />
      </div>
    </>
  );
};

export default Sidebar;
