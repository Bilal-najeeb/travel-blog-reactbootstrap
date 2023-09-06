import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_PROFILE_IMAGE_PATH;


const AdminUpdateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {id: userId} = useParams();



    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(userId);
        
        if(password != confirmPassword) {
            toast.error("Passwords Don't Match")
        } else {
            try {

                const res = await axios.put('http://localhost:3000/api/users/profile/updatesingle',{
                    _id: userId,
                    name: name,
                    email: email,
                    password: password,
                })

                const data = await res.data;
                console.log("updated data", data);
                toast.success('Profile Updated!');
              
                
            } catch (error) {
               
                toast.error(error?.response?.data?.message);
            }
        }

    }


    const getUserInfo = async () => {
     
        try {
            const res = await axios.get(`http://localhost:3000/api/users/profile/single/${userId}`)
        const data = await res.data;
       

        setName(data.name);
        setEmail(data.email);
        setProfileImage(data.image);

       

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    useEffect(()=>{
        getUserInfo();
    
    },[])


  return (
    <Container className='mt-5'>
            <h1 className='mb-5'>User Profile</h1>

            <Row>
                <Col md="4" lg="4">
                <Card className='d-flex align-items-center justify-content-center h-100 p-5 bg-primary bg-opacity-75 border-0 text-center'>
                <div className='w-75 ratio ratio-1x1 mx-auto'>
                <Card.Img variant="top" className='object-fit-cover rounded-circle w-100 h-100' src={profileImage ? `${baseUrl}${profileImage}` : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000' } />
                </div>
                    <Card.Body className='custom-card-body'>
                        <Card.Title className='text-white '>{name}</Card.Title>
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
                        <Form.Label>New Password (optional) </Form.Label>
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
  )
}

export default AdminUpdateUser