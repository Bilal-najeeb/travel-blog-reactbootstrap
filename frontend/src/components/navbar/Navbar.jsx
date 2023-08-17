import React from 'react'
import {Nav, Container, Navbar} from 'react-bootstrap'
import './navbar.css'

const Header = () => {
  return (
    <>
 
    <Navbar bg='light' expand="sm" collapseOnSelect>

            <Container>
                <Navbar.Brand href='/'>Travel Blog</Navbar.Brand>
                
                <Navbar.Toggle/>
                <Navbar.Collapse className='right-align'>
                    <Nav className="me-auto justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign up</Nav.Link>
                        <Nav.Link href="/createpost">Create Post</Nav.Link>


                    </Nav>
                </Navbar.Collapse>
            </Container>
            
    </Navbar>
    
       
    </>
  )
}

export default Header