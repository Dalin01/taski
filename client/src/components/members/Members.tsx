import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import './style.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Failed, State } from '../../types';
import { useParams } from 'react-router-dom';
import { Workspace } from '../../types';
import { getCurrentWorkspace } from '../../helper';

const Members = () => {
  const [email, setEmail] = useState('');

  const userLogin = useSelector((state: any) => state.user);
  const { error, user }: { loading: Boolean; error: Failed; user: State } =
    userLogin;
  const workspacesInStore: Workspace = useSelector(
    (state: any) => state.workSpaces
  );
  const workspace = workspacesInStore.workspace;
  let { id, name }: { id: string; name: string } = useParams();

  useEffect(() => {
    if (workspace) {
      const result = getCurrentWorkspace(workspacesInStore, name, id);
      console.log(result);
    }
  }, [workspace, workspacesInStore, id, name]);

  function submit() {}
  return (
    <div className="body">
      <Card className="card">
        <Card.Body>
          <Card.Title>Members</Card.Title>
          <hr />
          <ListGroup variant="flush">
            <ListGroup.Item>
              <i className="fas fa-users-cog"></i> Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Form onSubmit={submit} className="mt-3">
        <Form.Group controlId="email">
          <Form.Label>
            <i className="fas fa-envelope"></i> Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="dark" className="my-3">
          ADD NEW MEMBER
        </Button>
      </Form>
    </div>
  );
};

export default Members;
