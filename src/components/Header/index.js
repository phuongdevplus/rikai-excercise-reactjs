import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import logo from '../../assets/images/icon.png';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Header() {

  const { isLogin, setIsLogin } = useContext(AppContext)
  // setIsLogin(true)
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <Image style={{ width: '40px', marginRight: '10px' }} src={logo}></Image>
        </Navbar.Brand>
        <Navbar.Brand href="/">Rikai-News</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>All Post</Nav.Item>
            <Nav.Item>Your Post</Nav.Item>
          </Nav>
          <Nav>
            {
              isLogin ?
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item>Add Post</NavDropdown.Item>
                  <NavDropdown.Item>LogOut</NavDropdown.Item>
                </NavDropdown> :
                <Nav>
                  <Link style={{ color: '#000', }} to='/register'>
                    <Button variant="success">Register</Button>
                  </Link>
                  <Link style={{ color: '#000', marginLeft: '10px' }} to='/login'>
                    <Button variant="primary">Login</Button>
                  </Link>
                </Nav>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;