import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './sidebar.css'
import { toggle } from '../../slices/sideBarSlice'
import {useSelector, useDispatch} from 'react-redux'


const Sidebar = () => {


  const dispatch = useDispatch();



  const handleToggle = (e) => {
    console.log("clicking");
    dispatch(toggle("myProfile"));
  }
  
  const handleToggle1 = () => {
    dispatch(toggle("myBlogs"));
  }

  return (
    <>
      <Container fluid  className='bg-dark min-vh-100'>
       <Row>
         <Col className='sidebar d-flex flex-column text-white p-2 align-items-center my-5'>
         <Link to="" className='d-flex align-items-center' style={{textDecoration: 'none'}}>
                <span className='fs-5'>Dashboard</span>
          </Link>
          <hr className='text-secondary' style={{height: '10px', width: '150px'}}/>
          <ul className='nav nav-pills flex-column p-0 m-0'>
            <li className='nav-item' onClick={handleToggle}>
                <Link to="" className='nav-link text-white align-items-center d-flex'>
                  <i className='bi bi-person me-2 fs-3'></i>
                  <span className='fs-5'>My Profile</span>
                </Link>
            </li>
            <hr className='text-secondary' style={{height: '10px', width: '150px'}}/>
            <li className='nav-item' onClick={handleToggle1}>
                <Link to="" className='nav-link text-white align-items-center d-flex'>
                  <i className='bi bi-postcard me-2 fs-3'></i>
                  <span className='fs-5'>My Blogs</span>
                </Link>
            </li>
          </ul>
         </Col>
       </Row>
       </Container>
    </>
  )
}

export default Sidebar