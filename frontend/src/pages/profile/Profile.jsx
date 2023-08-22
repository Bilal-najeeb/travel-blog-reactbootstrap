import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import './profile.css'
import { setCredentials } from '../../slices/authSlice'
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'

const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(password != confirmPassword) {
            toast.error("Passwords don't match");
        } else {
            try {

                const res = await axios.put('http://localhost:8000/api/users/profile',{
                    _id: userInfo._id,
                    name: name,
                    email: email,
                    password: password,
                })

                const data = await res.data;
                dispatch(setCredentials({...data}));
                toast.success('Profile Updated!');
                
            } catch (error) {
               
                toast.success(error?.response?.data?.message);
            }
        }


    }

    useEffect(()=>{
        
        setName(userInfo.name);
        setEmail(userInfo.email);
   
    },[userInfo.setName, userInfo.setEmail]);

  return (
    <>
        <Container className='mt-5'>
            <h1 className='mb-5'>My Profile</h1>

            <Row>
                <Col md="4" lg="3">
                <Card className='d-flex align-items-center justify-content-center h-100 p-5 bg-primary bg-opacity-75 border-0 text-center'>
                <div className='w-75 ratio ratio-1x1 mx-auto'>
                <Card.Img variant="top" className='object-fit-cover rounded-circle w-100 h-100' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                </div>
                    <Card.Body className='custom-card-body'>
                        <Card.Title className='text-white '>Name Here</Card.Title>
                    </Card.Body>
                </Card>
                </Col>

                <Col md="8">
                    <Card className='py-5 px-4'> 
                        
                    <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control autoComplete="new-password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control autoComplete="new-password" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </Form.Group>

                   
                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>

                    

                    </Form>


                    </Card>
                </Col>
            </Row>

        </Container>
    </>
  )
}

export default Profile