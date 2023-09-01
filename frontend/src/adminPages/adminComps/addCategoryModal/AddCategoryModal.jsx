import React, { useState } from 'react'
import './addcategorymodal.css'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import modalToggleSlice, { setCatToggle } from '../../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';


const AddCategoryModal = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState('');




  
  const [errorMessages, setErrorMessages] = useState({
    name: '',
  });

  const validationHandler = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }


    setErrorMessages(errors);

    // Check if there are any errors
    return Object.values(errors).every((error) => error === '');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validationHandler();

    if (isValid) {
      try {
        const res = await axios.post('http://localhost:3000/api/categories/createcategory', {
          name: name,
        });

        dispatch(setCatToggle());
        toast.success('Category Created Successfully');

 
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };





  return (
    <div className='addNewUser text-white'>
                            
                            
                          <div className='newUser-Wrapper'>
                            <Button variant='danger' className='clsbtn' onClick={()=>dispatch(setCatToggle())}>X</Button>
                            <Form onSubmit={submitHandler}>
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

                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                            </Form>
                          </div>
    </div>
  )
}

export default AddCategoryModal