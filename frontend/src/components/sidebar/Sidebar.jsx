import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './sidebar.css'
import { toggle } from '../../slices/sideBarSlice'
import {useSelector, useDispatch} from 'react-redux'


const Sidebar = (props) => {


  const dispatch = useDispatch();



  const handleToggle = (e) => {
    console.log("clicking");
    dispatch(toggle("myProfile"));
  }
  
  const handleToggle1 = () => {
    dispatch(toggle("myBlogs"));
  }

  const handleToggle3 = () => {
    dispatch(toggle("userData"));
  }

  const handleToggle4 = () => {
    dispatch(toggle("categoriesData"));
  }

  const handleToggle5 = () => {
    dispatch(toggle("locationsData"));
  }

  const handleToggle6 = () => {
    dispatch(toggle("sublocationsData"));
  }

  return (
    <>
      <Container fluid  className='bg-dark min-vh-100' style={{width: 200}}>
       <Row>
         <Col className='sidebar d-flex flex-column text-white p-2 align-items-start my-3'>
         <Link to="" className='d-flex align-self-start py-2 px-2' style={{textDecoration: 'none'}}>
                <span className='fs-5'>Dashboard</span>
          </Link>
          <hr className='text-secondary align-self-center' style={{height: '10px', width: '200px'}}/>
          <ul className='nav nav-pills flex-column' style={{width: 'inherit'}}>
          {props.isAdmin ? (<>

           
            <li className='nav-item' style={{width: 'inherit'}}  onClick={handleToggle3}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className='bi bi-person me-3 fs-5'></i>
                  <span className='fs-6'>User</span>
                </Link>
            </li>

            <li className='nav-item' onClick={handleToggle4}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className="bi bi-bookmarks me-3 fs-5"></i>
                  <span className='fs-6'>Category</span>
                </Link>
            </li>

            <li className='nav-item' onClick={handleToggle5}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className="bi bi-geo-alt-fill me-3 fs-5"></i>
                  <span className='fs-6'>Location</span>
                </Link>
            </li>

            <li className='nav-item' onClick={handleToggle6}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className="bi bi-geo-alt-fill me-3 fs-5"></i>
                  <span className='fs-6'>Sub Location</span>
                </Link>
            </li>

            <li className='nav-item' onClick={handleToggle1}>
                <Link to="/" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className='bi bi-house me-3 fs-6'></i>
                  <span className='fs-6'>Home</span>
                </Link>
            </li>

          </>) : (
            <>
            <li className='nav-item' onClick={(handleToggle)}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className='bi bi-person me-3 fs-5'></i>
                  <span className='fs-6'>User Profile</span>
                </Link>
            </li>
            <li className='nav-item' onClick={handleToggle1}>
                <Link to="" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className='bi bi-postcard me-3 fs-5'></i>
                  <span className='fs-6'>Blogs</span>
                </Link>
            </li>
            <li className='nav-item' onClick={handleToggle1}>
                <Link to="/" className='nav-link py-2 px-2 text-white align-items-center d-flex'>
                  <i className='bi bi-house me-3 fs-6'></i>
                  <span className='fs-6'>Home</span>
                </Link>
            </li>
            </>
          )}
          </ul>
         </Col>
       </Row>
       </Container>
    </>
  )
}

export default Sidebar