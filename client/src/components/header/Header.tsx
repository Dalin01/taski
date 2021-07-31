import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { State } from '../../types';

const Header = () => {
  const { user }: { user: State } = useSelector((state: any) => state.user);
  //const registerLogin = useSelector((state: any) => state.userRegister);
  //let currentUser: State | null = null;

  // if (user) {
  //   const { user }: { user: State } = userLogin;
  //   currentUser = user;
  // } else if (registerLogin) {
  //   const { user }: { user: State } = registerLogin;
  //   currentUser = user;
  // }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Taski</Navbar.Brand>
          <Nav className="ml-auto">
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
    </header>
  );
};

export default Header;
