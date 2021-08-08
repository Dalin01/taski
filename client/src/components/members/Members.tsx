import { Card, ListGroup, Form, Button, Alert } from 'react-bootstrap';
import './style.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Failed,
  Members,
  UserType,
  WorkspaceType,
  InitialState,
} from '../../types';
import { useParams } from 'react-router-dom';
import {
  addTeamMember,
  removeTeamMember,
} from '../../actionCreators/taskAction';
import { useDispatch } from 'react-redux';

const MembersList = ({
  createdBy,
  currentTaskspace,
}: {
  createdBy: string;
  currentTaskspace: WorkspaceType;
}) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state: InitialState) => state.user);
  const { user }: { loading: Boolean; error: Failed; user: UserType } =
    userLogin;

  const taskMembers: Members = useSelector(
    (state: InitialState) => state.members
  );
  const membersNames: [
    { id: string; firstName: string; lastName: string; email: string }
  ] = taskMembers.members;

  let memberError: string = '';
  if (taskMembers.error) memberError = taskMembers.error.error;

  let { id, name }: { id: string; name: string } = useParams();

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    if (currentTaskspace) {
      const details = {
        workspaceName: name,
        workspaceId: id,
        userEmail: email,
        result: currentTaskspace,
      };
      dispatch(addTeamMember(details, user.token));
      setEmail('');
    }
  }

  function deleteMember(dataValue: string | null): void {
    if (dataValue) {
      const details = {
        workspaceName: name,
        workspaceId: id,
        userEmail: email,
        result: currentTaskspace,
        dataValue,
      };
      dispatch(removeTeamMember(details, user.token));
    }
  }

  return (
    <div className="body">
      {memberError && <Alert variant="info">No user found</Alert>}
      <Card className="card">
        <Card.Body>
          <Card.Title>Members</Card.Title>
          <hr />
          <ListGroup variant="flush">
            {!taskMembers.loading &&
              membersNames.length &&
              membersNames.map((aMember) => (
                <ListGroup.Item key={aMember.id} style={{ display: 'flex' }}>
                  {String(aMember.id) === String(createdBy) && (
                    <i className="fas fa-users-cog"></i>
                  )}{' '}
                  {`${aMember.firstName} ${aMember.lastName}`}
                  <span
                    style={{ marginLeft: 'auto' }}
                    onClick={(event) =>
                      deleteMember(
                        (event.target as Element).getAttribute('data-myvalue')
                      )
                    }
                  >
                    <i
                      className="fas fa-trash-alt "
                      // style={{ marginLeft: 'auto' }}
                      data-myValue={aMember.id}
                    ></i>
                  </span>
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
