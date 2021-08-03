import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { State } from '../../types';
import ModalComponent from '../modal/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const { user }: { user: State } = useSelector((state: any) => state.user);

  const history = useHistory();
  let [path, setPath] = useState('');

  useEffect(() => {
    return history.listen((location) => {
      setPath(history.location.pathname);
    });
  }, [history]);

  const [show, setShow] = useState(false);
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Taski</Navbar.Brand>
          <Nav className="ml-auto">
            {user && path.split('/').length > 2 && (
              <Nav.Link onClick={() => setShow(true)}>
                <i className="fas fa-plus"></i> Create Task
              </Nav.Link>
            )}
            {user ? (
              <Nav.Link href="/logout">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/register">
                <i className="fas fa-user-plus"></i> Register
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <ModalComponent showModal={show} setShowModal={setShow} />
    </header>
  );
};

export default Header;
