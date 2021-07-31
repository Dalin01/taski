import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkspaceForm from '../../components/workspaceForm/WorkspaceForm';
import { State, Failed, Workspace } from '../../types';
import {
  createWorkspace,
  getWorkspaces,
} from '../../actionCreators/workspaceAction';
import { useHistory } from 'react-router-dom';

const Workspaces = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  // const workspacesInStore = useSelector((state: any) => state.getWorkspaces);
  const workspacesInStore: Workspace = useSelector(
    (state: any) => state.workSpaces
  );
  const { loading, error, workspace } = workspacesInStore;

  const { user }: { user: State } = useSelector((state: any) => state.user);

  function create(event: React.FormEvent): void {
    event.preventDefault();
    setName('');
    dispatch(createWorkspace(name, user.id, user.token));
  }

  useEffect(() => {
    dispatch(getWorkspaces(user.id, user.token));
  }, [user.id, user.token, dispatch]);

  const history = useHistory();
  function openWorkspace(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const value = e.currentTarget.value;
    history.push(`/workspace/${user.id}/${value}`);
  }

  return (
    <Container>
      <div className="py-5">
        <h4>
          <i className="fas fa-building"></i> Workspaces (
          {workspace && workspace.length >= 1 ? workspace.length : 0})
        </h4>
        <hr />

        {showForm && (
          <WorkspaceForm name={name} setName={setName} create={create} />
        )}

        <div>
          {loading && <p>...loading</p>}
          {error && (
            <div className="alert alert-dismissible alert-warning">
              <p className="mb-0">{error.message}</p>
            </div>
          )}
          <button
            type="button"
            className="btn btn-light myBtn"
            onClick={(e) => setShowForm(!showForm)}
          >
            +
          </button>

          {workspace &&
            workspace.length &&
            workspace.map(({ name }: { name: string }) => {
              if (name)
                return (
                  <button
                    key={name}
                    type="button"
                    value={name}
                    className="btn btn-light myBtn"
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
