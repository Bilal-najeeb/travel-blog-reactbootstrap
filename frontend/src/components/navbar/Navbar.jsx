import React from 'react'
import {Nav, Container, Navbar, NavDropdown, Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './navbar.css'

import {useSelector, useDispatch} from 'react-redux'
import { removeCredentials } from '../../slices/authSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth);


  const dispatch = useDispatch();
  const navigate= useNavigate();

  const logoutHandler = async () => {

    try {
      await axios.post('http://localhost:8000/api/users/logout')
      dispatch(removeCredentials());
      navigate('/');

    } catch (error) {
      console.log(error?.message);
    }

  }

  return (
    <>
 
    <Navbar bg='light' expand="sm" collapseOnSelect>

            <Container>
                <Navbar.Brand href='/'>Travel Blog</Navbar.Brand>
                
                <Navbar.Toggle/>
                <Navbar.Collapse className='right-align'>
                
                    <Nav className="me-auto justify-content-end" style={{ width: "100%" }}>

                      { userInfo ? (<>
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                           <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/createpost'>
                           <NavDropdown.Item>Create Blog Post</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                      </>) : (<>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign up</Nav.Link>
                      </>)}

                    </Nav>

                </Navbar.Collapse>
            </Container>
            
    </Navbar>
    
       
    </>
  )
}

export default Header