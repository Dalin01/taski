import React from 'react';
import { Members } from '../../types';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

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
              <Form.Control as="select" onChange={() => {}}>
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            CANCEL
          </Button>
          <Button variant="dark" onClick={() => setShowModal(false)}>
            CREATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
