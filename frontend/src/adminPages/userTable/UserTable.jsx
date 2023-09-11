import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import './userTable.css'
import AddUserModal from '../adminComps/addUserModal/AddUserModal'
import modalToggleSlice, { setToggle } from '../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Pagination from 'react-bootstrap/Pagination';
import {DataGrid} from '@mui/x-data-grid';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './userTable.css'; // Import the CSS file
// LIMIT = 5

// const totalPagesCalculator = (total, limit) => {
//     const pages = [];
//     for(let x = 1; x<=parseInt(total)/limit; x++) {
//         pages.push(x);
//     }

//     return pages;
// }

const UserTable = () => {

    const [userData, setUserData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {isVisible} = useSelector((state)=>state.modalToggle);

 

    const getUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/users/profile/all`);
            const data = await res.data;
            setUserData(data);
            //setTotalUsers(data.total);
            console.log(data);
        } catch (error) {
            toast.error(error?.data?.response?.message);
        }

    }

    const handleIsActive = async (id) => {

        const canInActivate = window.confirm('Are you sure you want to Update user Status?');

        if (canInActivate) {

        console.log(id);
        try {
            const res = await axios.put(`http://localhost:3000/api/users/profile/soft-delete/${id}`);
            const data = await res.data;
         
            toast.success("User Status Updated");
            console.log(res);
            
        } catch (error) {
            toast.error(error.response.data.message);
        }

    } else {
        return;
    }
    }



    useEffect(()=>{
        getUserData();
    },[ activePage ])

   

    /* DATA GRID ROWS AND COLUMNS */


    const columns =  [
        {field: "id", headerName: "Id", width: 100},
        {field: "name", headerName: "Name", width: 200},
        {field: "role", headerName: "Role", width: 200},
        {field: "email", headerName: "Email", width: 200},
        {
            field: "isActive",
            headerName: "isActive",
            width: 100,
            renderCell: (params) => (
              <Button
                onClick={()=>handleIsActive(params.row.userId)}
                variant={params.row.isActive == true ? 'outline-success' : 'outline-danger'}
              >
               {String(params.row.isActive)}
              </Button>
            ),
          },
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            sortable: false,
            renderCell: (params) => (
              <Button
                onClick={() => {
               
                  navigate(`/adminupdateuser/${params.row.userId}`);
                }}
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
                //onClick={()=>handleDelete(params.row.userId)} 
                variant="outline-danger"
              >
                <i className="bi bi-trash3"></i>
              </Button>
            ),
          },



    ];

    const rows = userData?.map((row, index)=>({
        id: index + 1,
        name: row.name,
        role: row.role,
        email: row.email,
        isActive: row.isActive,
        // Store the user ID in a closure
        userId: row._id,


    }))


  return (
    <>
        <Container className='mt-2 d-flex flex-column p-0'>

            <Row className='align-items-center d-flex'>
                <Col className='d-flex flex-column'>

                <h1 className='mb-4 p-3 rounded-3 shadow-sm fs-4 text-body bg-white'>Users Data</h1>
                    <Button className='align-self-end mb-3' onClick={()=>dispatch(setToggle())}>Create New User</Button>

                    {/* Add New User Modal */}
                    {isVisible && (
                        <AddUserModal/>
                    )}


{/* REACT BOOTSTRAP DATA TABLE AND PAGINATION  */}
                    
{/* 
                    <Table bordered striped responsive="sm" className='text-center'>
                        <thead>
                        <tr>
                        <th>#</th>
                            {userData.length > 0 &&
                                Object.keys(userData[0]).map((key) => {
                                // Exclude specific keys from being displayed as headers
                                if (key !== '_id' && key !== 'password' && key !== '__v' && key !== 'profile_image') {
                                    return <th key={key}>{key}</th>;
                                }
                                return null; // Skip this key
                                })}
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                        

                        </thead>
                        <tbody>
                        
                            {userData?.map((item, index)=>{
                                return (
                                    <tr  key={item._id}>

                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.createdAt.slice(0,10)}</td>
                                        <td>{item.updatedAt.slice(0,10)}</td>
                                        <td>{item.role}</td>
                                        <td><Button onClick={()=>navigate(`/adminupdateuser/${item._id}`)} className='bg-warning border-0'>Update</Button></td>
                                        <td><Button  onClick={()=>handleDelete(item._id)} className='bg-danger border-0'>Delete</Button></td>
                                    </tr>
                                )
                            })}
                        
                        
                        </tbody>
                    </Table>
                    
                    <Pagination className='justify-content-center'>
                        {activePage !== 1 && <Pagination.Prev onClick={()=>setActivePage(activePage-1)}/>}
                        {totalPagesCalculator(totalUsers, LIMIT).map((pageNo)=>{return(
                            <Pagination.Item className={`${pageNo === activePage ? 'active': ''}`} key={pageNo} onClick={(e)=>setActivePage(pageNo)}>{pageNo}</Pagination.Item>
                        )})}
                        {activePage !== parseInt(totalUsers/LIMIT) && <Pagination.Next onClick={()=>setActivePage(activePage+1)}/>}
                    
                    </Pagination> */}
                 
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

export default UserTable