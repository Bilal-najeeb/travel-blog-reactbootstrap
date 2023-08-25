import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Card, Form } from 'react-bootstrap'
import BlogCard from '../../components/blogCards/BlogCard'
import { toast } from 'react-toastify'

const MyBlogs = () => {

  const [apiData, setApiData] = useState([]);

  const myBlogApi = async () => {

    const res = await axios.get("http://localhost:3000/api/blogs/userblog");
    const data = res.data;
    console.log(data);
    setApiData(data);

  }

  const myBlogDelete = async (blogId) => {
    
        console.log(blogId); 
        try {

          const res = await axios.delete(`http://localhost:3000/api/blogs/${blogId}`);
          console.log("deleted:", res);
          toast.success("deleted successfully");
          myBlogApi();
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
        

      }




  useEffect(()=>{
    myBlogApi();
  }, [])



  return (
    <>
    <Container className='mt-5'>
        <h1 className='mb-5'>My Blogs</h1>

        <Row className='g-4'>
                {
                  apiData?.slice(0, 3).map((data, index)=>{
                    return (
                      <Col lg="4" md="6" key={index}>
                        <BlogCard 
                        user={data.author.name}
                        blogImg={data.blogImg} 
                        title={data.title}
                        content={data.summary}
                        blogId={data._id}
                        addDelete="addDelete"
                        addUpdate="addUpdate"
                        myBlogDelete={myBlogDelete}
                        />
                      </Col>
                    )
                  })
                }
            </Row>

    </Container>
</>
  )
}

export default MyBlogs