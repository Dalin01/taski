import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';

const TaskContainer = () => {
  return (
    <Card border="dark" className="cardContainer my-1 mx-2">
      <Card.Header>Assigned to: John Doe</Card.Header>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <div className="links">
        <Card.Link href="#">REASSIGN</Card.Link>
        <Card.Link href="#">EDIT</Card.Link>
        <Card.Link href="#">CLOSE</Card.Link>
      </div>
    </Card>
  );
};

export default TaskContainer;
