import React, { useEffect, useState } from 'react'

import { Container, Form, Row, Col } from 'react-bootstrap'
import BlogCard from '../../components/blogCards/BlogCard'
import cardData from '../../data/cardData'
import { setBlogDataToSlice } from '../../slices/blogSlice'
import { useDispatch } from 'react-redux'

import axios from 'axios'

const Home = () => {

  const [blogPost, setBlogPost] = useState();
  const [searchTitle, setSearchTitle] = useState('');

  const dispatch = useDispatch();

  const blogsApi = async (e) => {
    e?.preventDefault();
    const res = await axios.get(`http://localhost:3000/api/blogs/?search=${searchTitle}`);
    const data = await res.data;
    setBlogPost(data);
    dispatch(setBlogDataToSlice(data));
    console.log(data);
  }


  useEffect(()=>{
    blogsApi();
  },[])



  return (
    <>

    <Container className='py-5 d-flex justify-content-center'>
      <Form className="d-flex col-12 col-md-6" onSubmit={blogsApi}>
        <Form.Control type='search' placeholder='search' aria-label="Search" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)}/>
        <button type='submit' className="btn btn-outline-success">Search</button>
      </Form>
    </Container>

    <Container>
            <Row className='g-4'>
                {
                  blogPost?.map((data, index)=>{
                    return (
                      <Col lg="4" md="6" key={index}>
                        <BlogCard user={data.author.name} blogImg={data.blogImg}  title={data.title} content={data.summary} blogId={data._id}/>
                      </Col>
                    )
                  })
                }
            </Row>
    </Container>
 
    </>
  )
}

export default Home