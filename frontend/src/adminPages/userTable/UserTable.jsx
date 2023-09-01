import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import './userTable.css'
import AddUserModal from '../adminComps/addUserModal/AddUserModal'
import modalToggleSlice, { setToggle } from '../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const UserTable = () => {

    const [userData, setUserData] = useState([]);


    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {isVisible} = useSelector((state)=>state.modalToggle);

 

    const getUserData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/users/profile/all");
            const data = await res.data;
            setUserData(data);
            console.log(data);
        } catch (error) {
            toast.error(error?.data?.response?.message);
        }

    }

    const handleDelete = async (id) => {

        const canDelete = window.confirm('Are you sure you want to delete this user?');

        if (canDelete) {

        console.log(id);
        try {
            const res = await axios.delete("http://localhost:3000/api/users/profile/delete",
            {
                data: {
                    userId: id,
                }
            });
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
        getUserData();
    },[])

   


  return (
    <>
        <Container className='mt-5 d-flex flex-column align-items-center'>
            <h1 className='mb-5'>Users Data</h1>

            <Row className='align-items-center d-flex'>
                <Col className='d-flex flex-column'>
              
                    <Button className='align-self-end mb-3' onClick={()=>dispatch(setToggle())}>Create New User</Button>

                    {/* Add New User Modal */}
                    {isVisible && (
                        <AddUserModal/>
                    )}

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

                </Col>
            </Row>

        </Container>
    </>
  )
}

export default UserTable