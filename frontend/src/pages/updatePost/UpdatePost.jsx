import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useSelector} from 'react-redux'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import {toast} from 'react-toastify'
 


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


const UpdatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState('');
    
    const [errorMessages, setErrorMessages] = useState('');

    const {id} = useParams();

    const {blogData} = useSelector((state)=>state.blog);
    const viewData = blogData.filter((item)=> item._id === id);

    useEffect(()=>{
        console.log(viewData);
        console.log(blogData);
        setTitle(viewData[0].title);
      
        setContent(viewData[0].content);
        setSummary(viewData[0].summary);
        setCategory(viewData[0].category);
       

    },[])

    const validationHandler = () => {
      const errors = {};
  
     
      if (!title.trim()) {
        errors.title = 'Title is required';
      }

      if (!content.trim()) {
        errors.content = 'Content is required';
      }

      if (!summary.trim()) {
        errors.summary = 'Summary is required';
      }

      if (!category.trim()) {
        errors.category = 'Category is required';
      }

    
  
  
      setErrorMessages(errors);
  
      // Check if there are any errors
      return Object.values(errors).every((error) => error === '');
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const isValid = validationHandler();        
        
        if(isValid){
        try {

          const res = await axios.put(`http://localhost:3000/api/blogs/${id}`, {
            title: title,
            content: content,
            summary: summary,
            category: category,
            blogImg: files,
          })

          const data = res.data;
          console.log("response:", data);

            
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }

      }


    }


    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFiles(base64);
    }

    const convertToBase64 = (file) => {
      return new Promise((resolve,reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ()=>{
          resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }




  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center my-5'>Update your Blog Post</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6" >

         <Form className='p-5  bg-white rounded-4' onSubmit={submitHandler}>

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <span className='text-danger'>{errorMessages.title}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Blog Content</Form.Label>
                <ReactQuill modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)}/>
                <span className='text-danger'>{errorMessages.content}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Blog Image</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload}/>
                <span className='text-danger'>{errorMessages.files}</span>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicSummary">
                <Form.Label>Blog Summary</Form.Label>
                <Form.Control type="text" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
                <span className='text-danger'>{errorMessages.summary}</span>
            </Form.Group>

            <Form.Select className="mb-3" aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select a Category</option>
              <option value="food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
            </Form.Select>
            <span className='text-danger'>{errorMessages.category}</span>
            
            <Button className='col-lg-12' variant="primary" type="submit">
                Update Blog Post
            </Button>

            
         </Form>


        </Col>
        </Row>
            
        </Container>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}></Container>
    
    </>
  )
}

export default UpdatePost