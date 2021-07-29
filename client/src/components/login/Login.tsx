import React from 'react';
import './style.css';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <>
      <Container className="main col-md-4 col-md-offset-4">
        <Form className="pt-5">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="info">SIGN IN</Button>
          <br />
          <hr />
          <Button variant="info" className="mb-1 google mt-5">
            Sign in with Google
          </Button>
          <br />
          {/* <Button variant="info" className="mb-1 facebook">
            sign in with Facebook
          </Button>
          <br />
          <Button variant="info" className="mb-1 linkedin">
            sign in with Linkedin
          </Button> */}
        </Form>
      </Container>
    </>
  );
};

export default Login;
