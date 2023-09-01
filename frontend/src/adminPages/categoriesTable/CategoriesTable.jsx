import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'

import modalToggleSlice, { setCatToggle } from '../../slices/modalToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import AddCategoryModal from '../adminComps/addCategoryModal/AddCategoryModal'



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




  return (
    <>
    <Container className='mt-5 d-flex flex-column align-items-center'>
        <h1 className='mb-5'>Categories Data</h1>

        <Row className='align-items-center d-flex'>
            <Col className='d-flex flex-column'>
          
                <Button className='align-self-end mb-3' onClick={()=>dispatch(setCatToggle())}>Create New Category</Button>

                {isCatVisible && <AddCategoryModal/>}

                <Table bordered striped responsive="sm" className='text-center'>
                <thead>
                        <tr>
                        <th>#</th>
                            {categoryData.length > 0 &&
                                Object.keys(categoryData[0]).map((key) => {
                                // Exclude specific keys from being displayed as headers
                                if (key !== '_id' && key !== '__v') {
                                    return <th key={key}>{key}</th>;
                                }
                                return null; // Skip this key
                                })}
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                        

                        </thead>
                    <tbody>
                    
                    {categoryData?.map((item, index)=>{
                                return (
                                    <tr  key={item._id}>

                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        
                                        <td><Button  className='bg-warning border-0'>Update</Button></td>
                                        <td><Button onClick={()=>handleDelete(item._id)} className='bg-danger border-0'>Delete</Button></td>
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

export default CategoriesTable