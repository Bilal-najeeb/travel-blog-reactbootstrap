import React from 'react'
import { Col, Container, Row, Button, Navbar, Nav, NavDropdown, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';


import { useSelector, useDispatch } from 'react-redux';
import { removeCredentials } from '../../../slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {

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
    <Navbar className='shadow-sm bg-white my-4 rounded-3' expand='sm' collapseOnSelect>
    <Container>
     
      <Navbar.Toggle />
      <Navbar.Collapse className='right-align'>
        <Nav className='me-auto justify-content-end align-items-center' style={{ width: '100%' }}>
          {userInfo ? (
            <div className='d-flex'>
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
            <Image src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000' style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 100}}/>

            </div>
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
  )
}

export default AdminNav