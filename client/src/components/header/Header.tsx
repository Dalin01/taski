import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Taski</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/register">
              <i className="fas fa-user-plus"></i> Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
