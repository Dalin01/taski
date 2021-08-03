import { Row, Col, Alert } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskContainer from '../../components/workspaceTopicContainer/TaskContainer';
import { State } from '../../types';
import { getTasks } from '../../actionCreators/taskAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Workspace = () => {
  const workspaceTasks = useSelector((state: any) => state.tasks);
  const { loading, tasks }: { loading: Boolean; tasks: any } = workspaceTasks;
  const { user }: { user: State } = useSelector((state: any) => state.user);
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

  return (
    <>
      <div>
        <Row>
          <Col xs={2}>
            <Sidebar />
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

export default Workspace;
