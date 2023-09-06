import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { setCredentials } from '../../slices/authSlice'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
 
import {useDispatch, useSelector} from 'react-redux';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const validationHandler = () => {
        const errors = {};
    
       
        if (!email.trim()) {
          errors.email = 'Email is required';
        }
    
        if (!password.trim()) {
          errors.password = 'Password is required';
        } else if (password.length < 6) {
          errors.password = 'Password should be at least 6 characters';
        }
    
    
        setErrorMessages(errors);
    
        // Check if there are any errors
        return Object.values(errors).every((error) => error === '');
      };
    

    const SubmitHandler = async (e) => {
        e.preventDefault();

        const isValid = validationHandler();
        console.log(isValid);
        if(isValid){

        try {

            const res = await axios.post('http://localhost:3000/api/users/auth', {
                email: email,
                password: password
            });

            const data = res.data;
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


    }

    useEffect(()=>{
        
        if(userInfo){
            console.log("login triggered")
            navigate('/');
        }

    },[])




  return (
    <>
        <Container fluid className='d-flex justify-content-center  flex-column bg-primary' style={{height: '100vh'}}>
            
        <h1 className='text-white text-center mb-5'>Log In</h1>
        
        <Row className='justify-content-center'>
        <Col sm="12" md="6">

         <Form className='p-5 bg-white rounded-4' onSubmit={SubmitHandler}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <span className='text-danger'>{errorMessages.email}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <span className='text-danger'>{errorMessages.password} </span>
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