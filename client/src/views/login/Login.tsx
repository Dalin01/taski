import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import FormContainer from '../../components/formContainers/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { login } from '../../actions/userAction';
import { State, Failed } from '../../types';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading,
    error,
    user,
  }: { loading: Boolean; error: Failed; user: State } = userLogin;

  const history = useHistory();
  useEffect(() => {
    if (user) {
      // request for workspaces!
      history.push('/workspaces');
    }
  }, [user, history]);

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer className="main">
      <h1 className="py-5">Sign In</h1>
      {error && (
        <div className="alert alert-dismissible alert-warning">
          <p className="mb-0">{error.message}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <Form onSubmit={submit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="info" className="my-3">
          SUBMIT
        </Button>

        <Row className="py-5">
          <Col>
            Don't have an acccount? <Link to={'/register'}>Join here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Login;
