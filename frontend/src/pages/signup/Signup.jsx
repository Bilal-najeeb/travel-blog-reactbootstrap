import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setCredentials } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {useFormik} from 'formik';
import { signUpSchema } from '../../validationSchemas/signUpSchema';
import {motion} from 'framer-motion'

import './signup.css'

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Signup = () => {
  
  
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);


  const {values, errors, touched, handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      // Values object contains the form values
    console.log('Form Values:', values);

    try {
      // Make an API request to send the form values
      const res = await axios.post('http://localhost:3000/api/users/', {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success('Signed Up Successfully');
      navigate('/login'); // Redirect the user after successful signup
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    }
  })


 

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <>

      <Container fluid className='d-flex bg-dark align-items-center justify-content-center' style={{ height: '100vh' }}>

      <motion.div animate={{x: 0}} initial={{x: -500}}>
        <Row  className='g-0 justify-content-center'>

        <Col lg={5} sm={5} xs={8} className='d-flex align-items-center rounded-start-2 xs-rounded-2  p-0'>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col className='p-0'>
                  <Image className='w-100 h-100 object-fit-cover rounded-start-2' src='https://img.freepik.com/free-photo/hightech-helmets-humanoid-being-generative-ai_8829-2879.jpg?w=740&t=st=1694081901~exp=1694082501~hmac=ec3dbfca29b6a3e9d1e32c9f5f2af88f41fb0ce67f027d827a292a97411d8400' />
                </Col>
              </Row>
            </Container>
          </Col>


          <Col lg={5} sm={5} xs={8} >
            <Container className='bg-white p-5 rounded-end-2'>
            <h1 className='text-black text-center mb-3'>Sign Up</h1>
            <Form className='bg-transparent rounded-4' onSubmit={handleSubmit}>


              <Form.Group className='mb-3 position-relative' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? <span className='error-message-1 text-danger'>{errors.name}</span> : null}
              </Form.Group>

              <Form.Group className='mb-3 position-relative' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? <span className='error-message-1 text-danger'>{errors.email}</span> : null}
              </Form.Group>

              <Form.Group className='mb-3 position-relative' controlId='formBasicPassword'>
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
                {errors.password && touched.password ? <span className=' error-message-1 text-danger'>{errors.password}</span> : null}
              </Form.Group>

              <Form.Group className='mb-3 position-relative' controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  autoComplete='new-password'
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
             {errors.confirmPassword && touched.confirmPassword ? <span className='error-message-1 text-danger'>{errors.confirmPassword}</span> : null}

              </Form.Group>

              <Button variant='primary' type='submit' className='w-100 mt-4'>
                Submit
              </Button>

              <Form.Group className='mt-3 text-center'>
                <Form.Text className='text-muted'>
                  Already a Member? <Link to='/login'>Sign In</Link>
                </Form.Text>
              </Form.Group>
            </Form>
            </Container>
          </Col>
        </Row>
      </motion.div>
      </Container>
    </>
  );
};

export default Signup;
