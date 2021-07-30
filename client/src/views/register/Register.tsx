import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import FormContainer from '../../components/formContainers/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userAction';
import { State, Failed, Register } from '../../types';
import { useHistory } from 'react-router-dom';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const registerLogin = useSelector((state: any) => state.userRegister);
  const {
    loading,
    error,
    user,
  }: { loading: Boolean; error: Failed; user: State } = registerLogin;

  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push('/workspaces');
    }
  }, [user, history]);

  function submit(event: React.FormEvent): void | false {
    event.preventDefault();
    const password = password1 === password2 && password1;
    if (password === false || password.length < 5) return false;
    const details: Register = { firstName, password, lastName, email };
    dispatch(register(details));
  }

  return (
    <FormContainer className="main">
      <h1 className="py-5">Register</h1>
      {error && (
        <div className="alert alert-dismissible alert-warning">
          <p className="mb-0">{error.message}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <Form onSubmit={submit}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label className="mt-2">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="mt-2">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password1">
          <Form.Label className="mt-2">Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label className="mt-2">Reenter password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Reenter password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="info" className="my-3">
          SUBMIT
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterView;
