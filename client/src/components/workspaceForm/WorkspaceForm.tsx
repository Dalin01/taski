import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

type propsType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
const WorkspaceForm = ({ name, setName }: propsType) => {
  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="name">
          <Form.Label column sm="2">
            <div className="py-1">Workspace name:</div>
          </Form.Label>
          <Col sm="6" className="py-1">
            <Form.Control
              type="text"
              placeholder="Enter workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Col>
          <Col sm="2" className="py-1">
            <Button type="submit" variant="info">
              CREATE
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default WorkspaceForm;
