import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';
import { Members } from '../../types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditModal from '../modal/EditModal';
import moment from 'moment';

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

  let { task, assignedTo, status, deadline } = taskDetails;

  const differenceInTime =
    new Date(taskDetails.deadline).getTime() - new Date().getTime();

  const differenceInDays =
    Math.floor((differenceInTime / (1000 * 3600 * 24)) * 100) / 100;

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
          <span className="deadline">{differenceInDays} days</span>
        </Card.Header>
        <Card.Body className="py-1 mx-0 px-1">
          <Card.Text className="scrollStyle">{task}</Card.Text>
        </Card.Body>
        <div className="links py-1 mx-0 px-1">
          <Card.Link onClick={editTask} className="edit">
            EDIT
          </Card.Link>
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
