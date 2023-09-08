import React from 'react';
import { Nav, Container, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import './navbar.css';

import { useSelector, useDispatch } from 'react-redux';
import { removeCredentials } from '../../slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_PROFILE_IMAGE_PATH;


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/logout');
      dispatch(removeCredentials());
      navigate('/');
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <Navbar bg='light' style={{minHeight: '10vh'}} expand='sm' collapseOnSelect>
        <Container>
          <Link to='/' className='navbar-brand d-flex align-items-center justify-content-center'>   
            <Image style={{width: 40}} src='/7841813.png'/>
            <h3 className='mx-2'><b><i>Traveli</i></b></h3>
          </Link>

          <Navbar.Toggle />
          <Navbar.Collapse className='right-align'>
            <Nav className='me-auto justify-content-end' style={{ width: '100%' }}>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    {
                      userInfo.role === "admin" ? (<>
                        <LinkContainer to='/admindashboard'>
                          <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      </>
                        
                      ) : (
                        <>
                        <LinkContainer to='/dashboard'>
                          <NavDropdown.Item>User Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/createpost'>
                          <NavDropdown.Item>Create Blog Post</NavDropdown.Item>
                        </LinkContainer>
                        </>
                      )
                    }
                    
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                <Image src={userInfo.image ? `${baseUrl}${userInfo.image}` : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'} style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 100}}/>

                </>
              ) : (
                <>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                  <Link to='/signup' className='nav-link'>
                    Sign up
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
