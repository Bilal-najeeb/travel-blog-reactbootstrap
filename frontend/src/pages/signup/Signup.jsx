import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'


const Signup = () => {
  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center mb-5'>Sign Up</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6">

         <Form className='p-5 bg-white rounded-4'>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>

            <Form.Group className='mt-2'>
            <Form.Text className="text-muted">
                Already a Member? <Link to="/login">Log In</Link>
            </Form.Text>
            </Form.Group>
            
         </Form>


        </Col>
        </Row>
            
        </Container>
    
    </>
  )
}

export default Signup