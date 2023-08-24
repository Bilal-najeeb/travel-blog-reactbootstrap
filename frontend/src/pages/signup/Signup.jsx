import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setCredentials } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

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

        const data = await res.data;
        toast.success('Signed Up Successfully');
        navigate('/login');
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Container
        fluid
        className='d-flex justify-content-center  flex-column bg-primary'
        style={{ height: '100vh' }}
      >
        <h1 className='text-white text-center mb-5'>Sign Up</h1>

        <Row className='justify-content-center'>
          <Col sm='12' md='6'>
            <Form className='p-5 bg-white rounded-4' onSubmit={SubmitHandler}>
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

              <Form.Group className='mt-2'>
                <Form.Text className='text-muted'>
                  Already a Member? <Link to='/login'>Log In</Link>
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
