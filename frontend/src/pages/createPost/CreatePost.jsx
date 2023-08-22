import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];


const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        

        try {
            
        } catch (error) {
            
        }


    }




  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center mb-5'>Welcome! Create a Blog Post</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6">

         <Form className='p-5 bg-white rounded-4' onSubmit={submitHandler}>

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Blog Content</Form.Label>
                <ReactQuill modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Blog Image</Form.Label>
                <Form.Control type="file" onChange={(e)=>setFiles(e.target.files)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Blog Summary</Form.Label>
                <Form.Control type="text" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
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