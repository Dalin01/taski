import { Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
// import { useParams } from 'react-router-dom';
import TaskContainer from '../../components/workspaceTopicContainer/TaskContainer';

const Workspace = () => {
  //let { id }: { id: string } = useParams();

  return (
    <>
      <div>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            <Row>
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
