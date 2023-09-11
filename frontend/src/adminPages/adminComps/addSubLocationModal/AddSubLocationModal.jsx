import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import modalToggleSlice, { setSubLocToggle } from '../../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';


const AddSubLocationModal = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [parentLocationId, setParentLocationId] = useState('');




  
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
        const res = await axios.post('http://localhost:3000/api/locations/createsublocation', {
          name: name,
          parentLocationId: parentLocationId,
        });

        dispatch(setSubLocToggle());
        toast.success('Location Created Successfully');

 
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  const getLocationData = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/locations/readlocation");
        const data = await res.data;
        setLocationData(data);
        console.log(data);
    } catch (error) {
        toast.error(error?.data?.response?.message);
    }

}

useEffect(()=>{

  getLocationData();

}, [])





  return (
    <div className='addNewUser text-white'>
                            
                            
                          <div className='newUser-Wrapper'>
                            <Button variant='danger' className='clsbtn' onClick={()=>dispatch(setSubLocToggle())}>X</Button>
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

                            <Form.Select className='mb-3' aria-label="Default select example" onChange={(e)=>setParentLocationId(e.target.value)}>
                              <option>Select a parent location</option>
                              {locationData.map((item, index)=>{return (
                                  <option key={item._id} value={item._id}>{item.name}</option>
                              )})}
                            </Form.Select>

                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                            </Form>
                          </div>
    </div>
  )
}

export default AddSubLocationModal