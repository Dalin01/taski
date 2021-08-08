import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/formContainers/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../actionCreators/userAction';
import { UserType, Failed, Register } from '../../types';
import { useHistory } from 'react-router-dom';
import { InitialState } from '../login/Login';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const registerLogin = useSelector((state: InitialState) => state.user);
  const {
    loading,
    error,
    user,
  }: { loading: boolean; error: Failed; user: UserType } = registerLogin;

  const history = useHistory();
  useEffect(() => {
    if (user && user.token) {
      history.push('/taskspace');
    }
  }, [user, history]);

  function submit(event: React.FormEvent): void {
    event.preventDefault();
    const password = password1 === password2 && password1;
    if (!password) {
      setFormError('Password confirmation does not match password.');
      return;
    }
    const details: Register = { firstName, password, lastName, email };
    dispatch(registerAction(details));
  }

  return (
    <FormContainer className="main">
      <h1 className="py-5">Register</h1>
      {error.error && (
        <div className="alert alert-dismissible alert-warning">
          <p className="mb-0">{error.message}</p>
        </div>
      )}
      {formError !== '' && (
        <div className="alert alert-dismissible alert-warning">
          <p className="mb-0">{formError}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <Form onSubmit={submit}>
        <Form.Group controlId="firstname">
          <Form.Label>
            <i className="fas fa-user"></i> First Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label className="mt-2">
            <i className="fas fa-user"></i> Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="mt-2">
            <i className="fas fa-envelope"></i> Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password1">
          <Form.Label className="mt-2">
            <i className="fas fa-key"></i> Enter Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label className="mt-2">
            <i className="fas fa-key"></i> Reenter password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Reenter password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="dark" className="my-3">
          SUBMIT
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterView;
