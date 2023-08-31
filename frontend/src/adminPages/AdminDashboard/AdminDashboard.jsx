import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'

import { Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'

import Sidebar from '../../components/sidebar/Sidebar';
import UserTable from '../userTable/UserTable';


const AdminDashboard = () => {

    const {isActive} = useSelector((state)=>state.sidebar);

  return (
    <>
      
      <div className='d-flex justift-content-between' >
            <div  className='col-auto'>
                    <Sidebar isAdmin="true"/>
            </div>
            
            {isActive == "userData" && <>
              <UserTable/>
            </>}
            

            

        </div>

        
    </>
  )
}

export default AdminDashboard