import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'

import { Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'

import Sidebar from '../../components/sidebar/Sidebar';
import UserTable from '../userTable/UserTable';
import CategoriesTable from '../categoriesTable/CategoriesTable';
import AdminNav from '../adminComps/adminNav/AdminNav';
import LocationsTable from '../locationsTable/LocationsTable';
import SubLocationsTable from '../subLocationsTable/SubLocationsTable';


const AdminDashboard = () => {

    const {isActive} = useSelector((state)=>state.sidebar);

  return (
    <>
      
      <div className='d-flex gap-2 bg-light' >
            <div  className='col-auto'>
                    <Sidebar isAdmin="true"/>
            </div>

            <div className='d-flex flex-column px-4' style={{flex: 1}}>
                <AdminNav/>
                
                {isActive == "userData" && <>
                  <UserTable/>
                </>}

                {isActive == "categoriesData" && <>
                  <CategoriesTable/>
                </>}

                {isActive == "locationsData" && <>
                  <LocationsTable/>
                </>}

                {isActive == "sublocationsData" && <>
                  <SubLocationsTable/>
                </>}
            </div>
            

            

        </div>

        
    </>
  )
}

export default AdminDashboard