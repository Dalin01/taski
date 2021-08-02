import { Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import TaskContainer from '../../components/workspaceTopicContainer/TaskContainer';
// import { Failed } from '../../types';
// import { getTasks } from '../../actionCreators/taskAction';

const Workspace = () => {
  // Currently working on...
  // const workspaceTasks = useSelector((state: any) => state.tasks);
  // const {
  //   loading,
  //   error,
  //   tasks,
  // }: { loading: Boolean; error: Failed; tasks: any } = workspaceTasks;

  // // useEffect(() => {

  // //   dispatch(getTasks());
  // // }, []);

  return (
    <>
      <div>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            <Row>
              {/* dummies */}
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
              <TaskContainer />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Workspace;
