import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import './profile.css'

import { Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'

import Sidebar from '../../components/sidebar/Sidebar';
import MyProfile from '../myProfile/MyProfile';
import MyBlogs from '../myBlogs/MyBlogs';

const Dashboard = () => {

    const {isActive} = useSelector((state)=>state.sidebar);


  return (
    <>
      
      <div className='d-flex justift-content-between' >
            <div  className='col-auto'>
                    <Sidebar/>
            </div>
            {isActive == 'myBlogs' ? (
                <div className='col-8 mx-5'>
        
                <MyBlogs/>

            </div>
            ) : (
                <div className='col-8 mx-5'>
                <MyProfile/>
                

            </div>
            )}
            

            

        </div>

        
    </>
  )
}

export default Dashboard