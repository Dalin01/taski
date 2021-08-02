import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import './style.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Failed, State, Members } from '../../types';
import { useParams } from 'react-router-dom';
import { Workspace } from '../../types';
import { getCurrentWorkspace } from '../../helper';
import { addTeamMember, getMembers } from '../../actionCreators/taskAction';
import { useDispatch } from 'react-redux';

const MembersList = () => {
  const [email, setEmail] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.user);
  const { user }: { loading: Boolean; error: Failed; user: State } = userLogin;
  const workspacesInStore: Workspace = useSelector(
    (state: any) => state.workSpaces
  );
  const workspaces = workspacesInStore.workspace;

  const membersNames: [
    { id: string; firstName: string; lastName: string; email: string }
  ] = useSelector((state: Members) => state.members).members;

  let { id, name }: { id: string; name: string } = useParams();

  useEffect(() => {
    if (workspaces) {
      const result = getCurrentWorkspace(workspacesInStore, name, id);
      setCreatedBy(result.createdBy);
      const info = {
        userEmail: user.id,
        userId: user.email,
        userToken: user.token,
      };

      dispatch(getMembers(result, info));
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

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    const details = {
      workspaceName: name,
      workspaceId: id,
      userEmail: email,
    };
    dispatch(addTeamMember(details, user.token));
    setEmail('');
  }

  return (
    <div className="body">
      <Card className="card">
        <Card.Body>
          <Card.Title>Members</Card.Title>
          <hr />
          <ListGroup variant="flush">
            {membersNames.length &&
              Object.keys(membersNames[0]).length !== 0 &&
              membersNames.map((aMember) => (
                <ListGroup.Item key={aMember.id}>
                  {String(aMember.id) === String(createdBy) && (
                    <i className="fas fa-users-cog"></i>
                  )}{' '}
                  {`${aMember.firstName} ${aMember.lastName}`}
                </ListGroup.Item>
              ))}
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

export default MembersList;
