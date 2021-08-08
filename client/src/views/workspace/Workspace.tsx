import { Row, Col, Alert } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskContainer from '../../components/workspaceTopicContainer/TaskContainer';
import { UserType, Members, Workspace } from '../../types';
import { getTasks } from '../../actionCreators/taskAction';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InitialState } from '../../types';
import { getCurrentWorkspace } from '../../helper';
import { getMembers } from '../../actionCreators/taskAction';

export type Task = {
  id: string;
  task: string;
  assignedTo: string;
  createdBy: string;
  deadline: string;
  workspaceName: string;
  workspaceId: number;
  createdAt: string;
  updatedAt: string;
};

export interface ITask {
  loading: boolean;
  tasks: Task[];
}

const WorkspaceView = () => {
  // Get Taskspaces, if any
  const workspacesInStore: Workspace = useSelector(
    (state: InitialState) => state.workSpaces
  );
  const workspaces = workspacesInStore.workspace;

  // Get Tasks
  const workspaceTasks: ITask = useSelector(
    (state: InitialState) => state.tasks
  );
  const { loading, tasks }: { loading: boolean; tasks: Task[] } =
    workspaceTasks;
  // Get User
  const { user }: { user: UserType } = useSelector(
    (state: InitialState) => state.user
  );
  // Get Taskspace members
  const taskMembers: Members = useSelector(
    (state: InitialState) => state.members
  );
  // const membersNames: [
  //   { id: string; firstName: string; lastName: string; email: string }
  // ] = taskMembers.members;
  // const memberError: string = taskMembers.error.error;

  const dispatch = useDispatch();
  let { id, name }: { id: string; name: string } = useParams();

  if (tasks && tasks[0] && Object.keys(tasks[0]).length === 0) tasks.shift();

  useEffect(() => {
    dispatch(
      getTasks({
        token: user.token,
        workspaceId: id,
        workspaceName: name,
      })
    );
  }, [dispatch, user.token, id, name]);

  const [createdBy, setCreatedBy] = useState('');
  const [currentTaskspace, setCurrentTaskspace] = useState({
    id: '',
    name: '',
    createdBy: -1,
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    if (workspaces && !(Object.keys(workspaces).length === 0)) {
      const result = getCurrentWorkspace(workspacesInStore, name, id);
      if (result) {
        setCurrentTaskspace(result);
        setCreatedBy('' + result.createdBy);
        dispatch(
          getMembers(result, {
            userEmail: user.id,
            userId: user.email,
            userToken: user.token,
          })
        );
      }
    }
  }, [
    workspaces,
    workspacesInStore,
    name,
    id,
    user.id,
    user.email,
    user.token,
    dispatch,
  ]);

  return (
    <>
      <div>
        <Row>
          <Col xs={2}>
            <Sidebar
              createdBy={createdBy}
              currentTaskspace={currentTaskspace}
            />
          </Col>
          <Col xs={10}>
            {loading && <p>loading...</p>}
            <Row className="mt-3">
              {tasks &&
                (tasks.length !== 0 || (
                  <div className="my-3 ml-2 alertClass">
                    Task list is empty. Click on "Create Task" add a task.
                  </div>
                ))}

              {tasks &&
                tasks.map((task: any) => (
                  <TaskContainer taskDetails={task} key={task.id} />
                ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WorkspaceView;
