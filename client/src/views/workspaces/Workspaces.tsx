import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkspaceForm from '../../components/workspaceForm/WorkspaceForm';
import { UserType, InitialState } from '../../types';
import {
  createWorkspace,
  getWorkspaces,
} from '../../actionCreators/workspaceAction';
import { useHistory } from 'react-router-dom';

const Workspaces = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const workspacesInStore = useSelector(
    (state: InitialState) => state.workSpaces
  );

  const { loading, error, workspace } = workspacesInStore;
  const { user }: { user: UserType } = useSelector(
    (state: InitialState) => state.user
  );

  function create(event: React.FormEvent): void {
    event.preventDefault();
    setName('');
    if (name !== '') dispatch(createWorkspace(name, user.token));
  }

  useEffect(() => {
    dispatch(getWorkspaces(user.token));
  }, [user.token, dispatch]);

  const history = useHistory();
  function openWorkspace(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const id = (e.target as Element).getAttribute('data-id');
    const name = e.currentTarget.value;
    history.push(`/taskspace/${id}/${name}`);
  }

  return (
    <Container>
      <div className="py-5">
        <h4>
          <i className="fas fa-building"></i> Taskspaces (
          {workspace && workspace.length >= 1 ? workspace.length : 0})
        </h4>
        <hr />

        {showForm && (
          <WorkspaceForm name={name} setName={setName} create={create} />
        )}

        <div>
          {loading && <p>...loading</p>}
          {error?.error && (
            <div className="alert alert-dismissible alert-warning">
              <p className="mb-0">{error.message}</p>
            </div>
          )}
          <button
            type="button"
            className="btn btn-dark addClass"
            onClick={(e) => setShowForm(!showForm)}
          >
            Add
          </button>

          {workspace &&
            workspace.length >= 1 &&
            workspace.map(({ name, id }: { name: string; id: string }) => {
              if (name)
                return (
                  <button
                    key={name}
                    type="button"
                    value={`${name}`}
                    data-id={id}
                    className="btn btn-dark myBtn"
                    onClick={(e) => openWorkspace(e)}
                  >
                    {name}
                  </button>
                );
              return undefined;
            })}
        </div>
      </div>
    </Container>
  );
};

export default Workspaces;
