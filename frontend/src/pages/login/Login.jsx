import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { setCredentials } from '../../slices/authSlice'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import {motion} from 'framer-motion'
 
import {useDispatch, useSelector} from 'react-redux';
import { loginSchema } from '../../validationSchemas/loginSchema';
import {useFormik} from 'formik';

import './login.css'


const initialValues = {
  
    email: "",
    password: "",
  
  }

const Login = () => {

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const {values, errors, touched, handleChange, handleSubmit, handleBlur} = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
       
    

        try {

            const res = await axios.post('http://localhost:3000/api/users/auth', {
                email: values.email,
                password: values.password
            });

            const data = await res.data;
            console.log('Response:', data.role);

            dispatch(setCredentials({...data}));

            if (data.role === "admin"){

                console.log("navigating to admin dashboard");
                toast.success('Logged in Successfully');
                navigate('/admindashboard');

            } else {

                toast.success('Logged in Successfully');
                console.log("navigating");
                navigate('/dashboard');
            }

        } catch (error) {
            console.log('Error:', error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || error.message);
        }
        
        }
      })
    
    

 

    useEffect(()=>{
        
        if(userInfo){
            console.log("login triggered")
            navigate('/');
        }

    },[])




  return (
    <>
      

        <Container fluid className='d-flex bg-dark align-items-center justify-content-center' style={{ height: '100vh' }}>
        
        <motion.div animate={{x: 0}} initial={{x: -500}}>
        <Row className='g-2 shadow-sm  p-4 bg-white rounded-3 m-0' style={{width: 800}}>
          
          <Col lg={6} sm={6} xs={12} className='d-flex align-items-center rounded-3 xs-rounded-2  p-0'>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col className='p-0'>
                  <Image className='w-100 h-100 object-fit-cover rounded-3' src='https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-arm_23-2149739748.jpg?w=900&t=st=1694078880~exp=1694079480~hmac=df2d5c1d6a27cb764c2dc6b2df8c57dc896e5041bf233c61533043b14d5da8d3' />
                </Col>
              </Row>
            </Container>
          </Col>

          <Col lg={6} sm={6} xs={12} >
            <Container className='bg-white p-5 rounded-end-2'>
              <h1 className='text-black text-center mb-3'>Sign In</h1>
              <Form className=' bg-transparent rounded-4' onSubmit={handleSubmit}>
                <Form.Group className='mb-4 position-relative' controlId='formBasicEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? <span className='error-message text-danger'>{errors.email}</span> : null}
                </Form.Group>
                <Form.Group className='mb-5 position-relative' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    autoComplete='new-password'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? <span className='error-message text-danger'>{errors.password}</span> : null}
                </Form.Group>
                <Button variant='primary' type='submit' className='w-100'>
                  Submit
                </Button>
                <Form.Group className='mt-3 text-center'>
                  <Form.Text animate={{x: 10}} className='text-muted'>
                    New Here? <Link to='/signup'>Sign Up</Link>
                  </Form.Text>
                </Form.Group>
              </Form>
            </Container>
          </Col>

        </Row>
        </motion.div>

      </Container>
    
    </>
  )
}

export default Login