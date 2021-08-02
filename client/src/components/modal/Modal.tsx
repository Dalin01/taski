import React from 'react';
import { Members, State } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { addTask } from '../../actionCreators/taskAction';
import { useHistory } from 'react-router-dom';
// import DatePicker from 'react-bootstrap-date-picker';

const ModalComponent = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const membersNames: [
    { id: string; firstName: string; lastName: string; email: string }
  ] = useSelector((state: Members) => state.members).members;

  const dispatch = useDispatch();
  const { user }: { user: State } = useSelector((state: any) => state.user);
  const history = useHistory();

  // TO DO
  // const date = new Date();
  // const datetime = `${date.getFullYear()}-${
  //   date.getMonth() + 1
  // }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
  // console.log(datetime);

  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('2021-06-12T19:30');
  const [assignedTo, setAssignedTo] = useState('');

  function createTask() {
    setShowModal(false);
    const userId = user.id;
    const userToken = user.token;
    if (task && deadline && assignedTo && userId) {
      const details = {
        assignedTo,
        task,
        date: deadline,
        token: userToken,
        createdBy: userId,
        workspaceId: history.location.pathname.split('/')[2],
        workspaceName: history.location.pathname.split('/')[3],
      };
      dispatch(addTask(details));
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE TASK</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Assigned To:</Form.Label>
              <Form.Control
                as="select"
                value={assignedTo}
                onChange={(e) => {
                  console.log(e.target.value);
                  setAssignedTo(e.target.value);
                }}
              >
                <option />
                {membersNames.length &&
                  Object.keys(membersNames[0]).length !== 0 &&
                  membersNames.map((aMember) => (
                    <option
                      value={aMember.id}
                      key={aMember.id}
                    >{`${aMember.firstName} ${aMember.lastName}`}</option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              Deadline:{' '}
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={deadline}
                // value="2021-06-12T19:30"
                min="2021-06-00T00:00"
                max="2022-06-00T00:00"
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            CANCEL
          </Button>
          <Button variant="dark" onClick={createTask}>
            CREATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
