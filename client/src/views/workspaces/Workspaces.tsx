import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';
import { useState, useEffect } from 'react';
import WorkspaceForm from '../../components/workspaceForm/WorkspaceForm';

const Workspaces = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  return (
    <Container>
      <div className="py-5">
        <h4>
          <i className="fas fa-building"></i> Workspaces
        </h4>
        <hr />

        {showForm && <WorkspaceForm name={name} setName={setName} />}
        <div>
          <button
            type="button"
            className="btn btn-light myBtn"
            onClick={(e) => setShowForm(!showForm)}
          >
            +
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Workspaces;
