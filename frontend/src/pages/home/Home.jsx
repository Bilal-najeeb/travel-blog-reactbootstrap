import React, { useEffect, useState } from 'react'

import { Container, Form, Row, Col } from 'react-bootstrap'
import BlogCard from '../../components/blogCards/BlogCard'




import axios from 'axios'

const Home = () => {

  const [blogPost, setBlogPost] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [getCategory, setGetCategory] = useState([]);


 

  const blogsApi = async (e) => {
    e?.preventDefault();
    const res = await axios.get(`http://localhost:3000/api/blogs/?search=${searchTitle}`);
    const data = await res.data;
    setBlogPost(data);

    console.log(data);

  }

  /* GET Categories from API */
  const categoryApi = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories/readcategory");
      const data = await res.data;
      setGetCategory(data);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

 



  useEffect(()=>{
    blogsApi();
    categoryApi();

  },[])

    
   /* category filter frontend */   
  const categoryFilter = catFilter ?
      
  blogPost.filter((blog) => {
 
    return blog.category[0].name === catFilter;
  })
       :

      blogPost


  return (

    <>

    <Container className='p-0' style={{marginTop: 100, height: '100%'}}>

    <Row>
      <Col lg={3}>              
          <div className='p-4 bg-light shadow-sm rounded-2 mb-5'>
              <h1 className='mb-5'>Filters</h1>
                <Container className=' px-0'>
                    <Form className="col-12 col-md- w-100" onSubmit={blogsApi}>
                      <Form.Control type='search' placeholder='Search blogs' aria-label="Search" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)}/>
                      <button type='submit' className="btn btn-outline-success w-100 my-3">Search</button>
                    </Form>
                  </Container>

                  <Container className='px-0'>
                  <Form.Select className="mb-3" aria-label="Default select example" value={catFilter} onChange={(e)=>setCatFilter(e.target.value)}>
                            <option value="">Select a Category</option>
                            {
                              getCategory.map((cat)=>{return(
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                              )})
                            }
                            
                          </Form.Select>
                  </Container> 
          </div>
          </Col>
          <Col lg={9}>
              <Container className='p-4 bg-light shadow-sm rounded-2'>
                      <h1 className='mb-5'>Blogs</h1>
                      <Row className='g-4'>
                          {
                          categoryFilter?.map((data, index)=>{
                              return (
                                <Col lg="4" md="6" key={index}>
                                  <BlogCard user={data.author.name} blogImg={data.blogImg}  title={data.title} content={data.summary} blogId={data._id}/>
                                </Col>
                              )
                            })
                          }
                      </Row>
              </Container>
          </Col>
    
    </Row>



    </Container>
 
    </>
  )
}

export default Home