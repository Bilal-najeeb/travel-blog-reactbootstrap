import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'


const CreatePost = () => {
  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center mb-5'>Welcome! Create a Blog Post</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6">

         <Form className='p-5 bg-white rounded-4'>

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Blog Content</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Blog Image</Form.Label>
                <Form.Control type="file"/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Blog Url</Form.Label>
                <Form.Control type="text" placeholder="Enter Image Url" />
            </Form.Group>
            
            <Button className='col-lg-12' variant="primary" type="submit">
                Create Post
            </Button>

            
         </Form>


        </Col>
        </Row>
            
        </Container>
    
    </>
  )
}

export default CreatePost