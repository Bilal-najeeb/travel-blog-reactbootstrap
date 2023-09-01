import React from 'react'
import './addusermodal.css'
import { useState } from 'react'

import modalToggleSlice, { setToggle } from '../../../slices/modalToggleSlice'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import SignupForm from '../../../components/signupForm/SignupForm'
import { useSelector, useDispatch } from 'react-redux'



const AddUserModal = () => {

    const dispatch = useDispatch();


  return (
    <div className='addNewUser text-white'>
                            
                            
                          <div className='newUser-Wrapper'>
                            <Button variant='danger' className='clsbtn' onClick={()=>dispatch(setToggle())}>X</Button>
                            <SignupForm />
                          </div>
    </div>
  )
}

export default AddUserModal