import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import './profile.css'

import { Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'

import Sidebar from '../../components/sidebar/Sidebar';
import MyProfile from '../myProfile/MyProfile';
import MyBlogs from '../myBlogs/MyBlogs';

import AdminNav from '../../adminPages/adminComps/adminNav/AdminNav';

const Dashboard = () => {

    const {isActive} = useSelector((state)=>state.sidebar);


  return (
    <>
      
        
      <div className='d-flex gap-2 bg-light' >
            <div  className='col-auto'>
                    <Sidebar/>
            </div>

            <div className='d-flex flex-column px-4' style={{flex: 1}}>
                <AdminNav/>
                
                {isActive == "myProfile" && <>
                  <MyProfile/>
                </>}

                {isActive == "myBlogs" && <>
                  <MyBlogs/>
                </>}
            </div>
            

            

        </div>

        
    </>
  )
}

export default Dashboard