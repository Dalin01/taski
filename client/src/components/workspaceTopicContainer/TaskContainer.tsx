import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';
import { Members } from '../../types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditModal from '../modal/EditModal';

type TaskDetails = {
  id: string;
  task: string;
  assignedTo: string;
  createdBy: string;
  status: string;
  deadline: string;
  workspaceName?: string;
  workspaceId?: string;
  createdAt: string;
  updatedAt?: string;
  taskId?: string;
};

const TaskContainer = ({ taskDetails }: { taskDetails: TaskDetails }) => {
  const membersNames: [
    { id: string; firstName: string; lastName: string; email: string }
  ] = useSelector((state: Members) => state.members).members;

  let { id, task, assignedTo, createdBy, status, deadline, createdAt } =
    taskDetails;

  for (let i = 0; i < membersNames.length; i++) {
    if (membersNames[i].id === assignedTo) {
      assignedTo = `${membersNames[i].firstName} ${membersNames[i].lastName}`;
    }
  }

  const spanClass =
    status === 'open' ? 'spanElement2 py-0 mb-0' : 'spanElement1 py-0 mb-0';

  function editTask() {
    setShow(true);
  }

  const [show, setShow] = useState(false);

  return (
    <>
      <Card border="dark" className="cardContainer my-1 mx-2 px-0 w-27">
        <Card.Header className="py-1 mx-0 px-1">
          Assigned to: {assignedTo}
          <br />
          <span className={spanClass}>{status}</span>{' '}
          <span className="deadline">{deadline}</span>
        </Card.Header>
        <Card.Body className="py-1 mx-0 px-1">
          <Card.Text className="scrollStyle">{task}</Card.Text>
        </Card.Body>
        <div className="links py-1 mx-0 px-1">
          <Card.Link onClick={editTask}>EDIT</Card.Link>
        </div>
      </Card>

      {show && (
        <EditModal
          showModal={show}
          setShowModal={setShow}
          currentTask={taskDetails}
        />
      )}
    </>
  );
};

export default TaskContainer;
