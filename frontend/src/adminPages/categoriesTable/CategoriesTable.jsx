import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'

import modalToggleSlice, { setCatToggle } from '../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import AddCategoryModal from '../adminComps/addCategoryModal/AddCategoryModal'

import {DataGrid} from '@mui/x-data-grid';


const CategoriesTable = () => {


    const [categoryData, setCategoryData] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {isCatVisible} = useSelector((state)=>state.modalToggle);

    const getCategoryData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/categories/readcategory");
            const data = await res.data;
            setCategoryData(data);
            console.log(data);
        } catch (error) {
            toast.error(error?.data?.response?.message);
        }

    }


    
    const handleDelete = async (id) => {

        const canDelete = window.confirm('Are you sure you want to delete this Category?');

        if (canDelete) {

        console.log(id);
        try {
            const res = await axios.delete(`http://localhost:3000/api/categories/deletecategory/${id}`);
            toast.success("Deleted Successfully");
            console.log(res);
            
        } catch (error) {
            toast.error(error.response.data.message);
        }

    } else {
        return;
    }
    }




    useEffect(()=>{
        getCategoryData();
    },[isCatVisible])


    
    /* DATA GRID ROWS AND COLUMNS */


    const columns =  [
        {field: "id", headerName: "Id", width: 100},
        {field: "name", headerName: "Name", width: 200},
   
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            sortable: false,
            renderCell: (params) => (
              <Button
                
                variant="outline-primary"
              >
               <i className="bi bi-pencil-square"></i>

              </Button>
            ),
          },
          {
            field: "delete",
            headerName: "Delete",
            width: 100,
            sortable: false,
            renderCell: (params) => (
              <Button
                onClick={()=>handleDelete(params.row.catId)} 
                variant="outline-danger"
              >
                <i className="bi bi-trash3"></i>
              </Button>
            ),
          },



    ];

    const rows = categoryData?.map((row, index)=>({
        id: index + 1,
        name: row.name,

        // Store the user ID in a closure
        catId: row._id,


    }))




  return (
    <>
    
    <Container className='mt-2 d-flex flex-column p-0'>

<Row className='align-items-center d-flex'>
    <Col className='d-flex flex-column'>

    <h1 className='mb-4 p-3 rounded-3 shadow-sm fs-4 text-body bg-white'>Categories Data</h1>
        <Button className='align-self-end mb-3'>Create New Category</Button>

       
     
        <div style={{height: 400, width: "100%"}} className='p-4 bg-white rounded-3 shadow-sm'>
        
        
        
        <DataGrid
            className='datagrid-custom'
            columns={columns}
            rows={rows}
            checkboxSelection
            pagination
            autoPageSize
            
            />
        </div>
    </Col>
</Row>



</Container>

    </>
  )
}

export default CategoriesTable