import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import logo from '../../assets/images/icon.png';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalAddPost from '../ModalAddPost';
import { ContainerHeader } from './style';
import AvatarDefault from '../../assets/images/avatarDefault.png'
import Swal from 'sweetalert2';
function Header() {

  const { getStorage, setGetStorage, user } = useContext(AppContext)
  const [showModalAdd, setShowModalAdd] = useState(false)
  function handleLogOut() {
    Swal.fire({
      title: "Log out?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const REACT_APP_URL_KEY = process.env.REACT_APP_URL_KEY
        localStorage.removeItem(REACT_APP_URL_KEY);
        setGetStorage(!getStorage)
      } else {
        Swal.fire({
          title: "Cancel !!",
          icon: "error",
          confirmButtonText: "Ok",
          showCloseButton: true,
        })
      }
    });
  }
  return (
    <ContainerHeader>
      <Navbar style={{ marginRight: '10px' }} collapseOnSelect expand="lg" bg="light">
        <ModalAddPost handle={{ showModalAdd, setShowModalAdd }}></ModalAddPost>
        <Container>
          <Navbar.Brand href="/">
            <Image style={{ width: '40px', marginRight: '10px' }} src={logo}></Image>
          </Navbar.Brand>
          <Navbar.Brand href="/">{user?.RoleId === '1'?'Rikai-News':'Rikai-Admin'}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {
                user?.RoleId === '1'?<>
                  <Nav.Item style={{ marginLeft: '10px' }}>New</Nav.Item>
                  <Nav.Item style={{ marginLeft: '10px' }}>Top</Nav.Item>
                  {/* <Nav.Item style={{ marginLeft: '50px' }}>
                  <Button onClick={() => setShowModalAdd(true)}  style={{ position: 'absolute', top: '15px' }} variant="success">Thêm bài viết</Button>
                  </Nav.Item>  */}
                </>:''
              }    
            </Nav>
            <Nav>
              {
                user?<img style={{width: '40px'}} alt='avatar' src={user?.Avatar?user?.Avatar:AvatarDefault}></img>:''
              }
              {
                user?
                  <NavDropdown title={user?.Name} id="collasible-nav-dropdown">
                    {/* {
                       user?.RoleId === '1'?
                       <NavDropdown.Item>
                      <Button style={{ width: '100%' }} type='button' variant="transparent" onClick={() => setShowModalAdd(true)}>
                        Thêm bài viết
                      </Button>
                    </NavDropdown.Item>:''
                    } */}
                    
                    <NavDropdown.Item>
                      <Button style={{ width: '100%' }} type='button' variant="transparent" onClick={() => handleLogOut()}>
                        Đăng xuất
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown> :
                  <Nav>
                    <Link style={{ color: '#000', }} to='/register'>
                      <Button variant="success">Đăng ký</Button>
                    </Link>
                    <Link style={{ color: '#000', marginLeft: '10px' }} to='/login'>
                      <Button variant="primary">Đăng nhập</Button>
                    </Link>
                  </Nav>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ContainerHeader>
  );
}

export default Header;