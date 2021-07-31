import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import TaskContainer from '../../components/workspaceTopicContainer/TaskContainer';

const Workspace = () => {
  let { id }: { id: string } = useParams();
  return (
    <>
      <div>
        {id} Hello
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
