import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/formContainers/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { loginAction } from '../../actionCreators/userAction';
import { Failed, UserType } from '../../types';
import { useHistory } from 'react-router-dom';
import { getWorkspaces } from '../../actionCreators/workspaceAction';
import { UserReducerType } from '../../reducers/userReducers';

export type InitialState = {
  user: UserReducerType;
  workSpaces: {};
  members: {};
  tasks: {};
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state: InitialState) => state.user);

  const {
    loading,
    user,
    error,
  }: { loading: boolean; user: UserType; error: Failed } = userLogin;

  const history = useHistory();
  useEffect(() => {
    if (user && user.token) {
      dispatch(getWorkspaces(user.token));
      history.push('/taskspace');
    }
  }, [user, history, dispatch]);

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    dispatch(loginAction(email, password));
  }

  return (
    <FormContainer>
      <h1 className="py-5 text-center">Sign In</h1>
      {error && error.error && !user.id && (
        <div className="alert alert-dismissible alert-warning">
          <p className="mb-0">{error.message}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <div className="card text-black mb-3 formStyle">
        <Form onSubmit={submit}>
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
          <Form.Group controlId="password" className="pt-2">
            <Form.Label>
              <i className="fas fa-key"></i> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="my-2">
            SUBMIT
          </Button>

          <Row className="py-5">
            <Col className="text-center">
              Don't have an acccount? <Link to={'/register'}>Join here</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Login;
