import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setCredentials } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../slices/modalToggleSlice';

const SignupForm = () => {

 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state)=>state.auth);
  const {isVisible} = useSelector((state)=>state.modalToggle);



  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validationHandler = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrorMessages(errors);

    // Check if there are any errors
    return Object.values(errors).every((error) => error === '');
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const isValid = validationHandler();

    if (isValid) {
      try {
        const res = await axios.post('http://localhost:3000/api/users/', {
          name: name,
          email: email,
          password: password,
        });

        dispatch(setToggle());
        toast.success('Signed Up Successfully');
        console.log(userInfo.role);

        if(userInfo.role == 'admin'){
            navigate('/admindashboard');
        }
 
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };



  return (

            <Form onSubmit={SubmitHandler}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className='text-danger'>{errorMessages.name}</span>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className='text-danger'>{errorMessages.email}</span>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete='new-password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className='text-danger'>{errorMessages.password}</span>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  autoComplete='new-password'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className='text-danger'>
                  {errorMessages.confirmPassword}
                </span>
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>

             
            </Form>

  );
};

export default SignupForm;
