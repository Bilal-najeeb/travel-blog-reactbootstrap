import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Signup from '../signup/Signup'

const Login = () => {
  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center mb-5'>Log In</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6">

         <Form className='p-5 bg-white rounded-4'>

            

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                 <Link to="#">Forgot Password?</Link>
                </Form.Text>
            </Form.Group>
            
            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>

            <Form.Group className='mt-2'>
            <Form.Text className="text-muted">
                New Here? <Link to="/signup">Sign Up</Link>
            </Form.Text>
            </Form.Group>
            
         </Form>


        </Col>
        </Row>
            
        </Container>
    
    </>
  )
}

export default Login