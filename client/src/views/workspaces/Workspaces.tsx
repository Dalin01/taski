import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';

const Workspaces = () => {
  return (
    <Container>
      <div className="py-5">
        <h4>
          <i className="fas fa-building"></i> Workspaces
        </h4>
        <hr />
        <div>
          <button type="button" className="btn btn-light myBtn">
            +
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Workspaces;
