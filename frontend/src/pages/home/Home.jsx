import React, { useEffect, useState } from 'react'

import { Container, Form, Row, Col } from 'react-bootstrap'
import BlogCard from '../../components/blogCards/BlogCard'
import axios from 'axios'
import {toast} from 'react-toastify'
import Pagination from 'react-bootstrap/Pagination';



const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= Math.ceil(total / limit); x++) {
    pages.push(x);
  }
  return pages;
};


const Home = () => {

  const [blogPost, setBlogPost] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [getCategory, setGetCategory] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [location, setLocation] = useState([]);
  const [locationQuery, setLocationQuery] = useState('');

  const [subLocation, setSubLocation] = useState([]);
  const [fetchSubLocation, setFetchSubLocation] = useState('');
  const [selectedSubLocation, setSelectedSubLocation] = useState('');

 

  const blogsApi = async (e) => {

    try {

    console.log("working", locationQuery);
    e?.preventDefault();
    const res = await axios.get(`http://localhost:3000/api/blogs/?search=${searchTitle}&page=${activePage}&limit=${pageSize}&category=${catFilter}&location=${locationQuery}`);
    const data = await res.data;
    setTotalBlogs(data.total);
    setBlogPost(data.blogs);
    console.log(data);
      
    } catch (error) {
      toast.error(error?.response?.data?.message);

    }

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

      /* GET location from API */
  const locationApi = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/locations/readlocation'
      );
      const data = await res.data;
      setLocation(data);
    
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };


   /* GET sub-locations from API */
   const subLocationApi = async () => {


    
    try {
      const res = await axios.get(
        `http://localhost:3000/api/locations/readsublocation?locationQuery=${fetchSubLocation}`
      );
      const data = await res.data;
      setSubLocation(data);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };


 



  useEffect(()=>{
    blogsApi();
    categoryApi();
    locationApi();
    subLocationApi();

  },[activePage, pageSize, catFilter, locationQuery])



  return (

    <>

    <Container fluid className='bg-light'>
        <Container>
    <Row style={{paddingTop: 100, paddingBottom: 100}}>
      <Col lg={3}>              
          <div className='p-4 bg-white shadow-sm rounded-2 mb-5'>
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
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                              )})
                            }
                            
                  </Form.Select>
                  </Container>

                  <Container className='px-0'>
                  <Form.Select className="mb-3" aria-label="Default select example" onChange={(e)=>setLocationQuery(e.target.value)}>
                            <option value="">Select a Location</option>
                            {
                              location.map((item)=>{return(
                                <option key={item._id} value={item.name}>{item.name}</option>
                              )})
                            }
                            
                  </Form.Select>
                  </Container>

                  <Container className='px-0'>
                  <Form.Select className="mb-3" aria-label="Default select example">
                            <option value="">Select sub Location</option>
                            {
                              subLocation.map((item)=>{return(
                                <option key={item._id} value={item._id}>{item.name}</option>
                              )})
                            }
                            
                  </Form.Select>
                  </Container>  
          </div>
          </Col>
          <Col lg={9}>
              <Container className='p-4 shadow-sm rounded-2 bg-white'>
                      <h1 className='mb-5'>Blogs</h1>
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
                      <Row className='d-flex justify-content-between'>
                          <Col lg={2} className='mt-5'>
                          <Pagination>
                                {activePage !== 1 && <Pagination.Prev onClick={()=>setActivePage(activePage-1)}/>}
                                {totalPagesCalculator(totalBlogs, pageSize).map((pageNo)=>{return(
                                    <Pagination.Item  key={pageNo} onClick={(e)=>setActivePage(pageNo)}>{pageNo}</Pagination.Item>
                                )})}
                                {activePage !== parseInt(totalBlogs/pageSize) && <Pagination.Next onClick={()=>setActivePage(activePage+1)}/>}
                            
                            </Pagination> 
                          </Col>
                          <Col lg={6} className='mt-5 mx-3 d-flex align-items-end justify-content-end'>
                          <Form.Select className='w-50 text-start' value={pageSize} onChange={(e)=>setPageSize(e.target.value)} aria-label="Default select example">
                            <option>Page Limit</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                          </Form.Select>
                          </Col>   
                      </Row>
              </Container>
          </Col>
    
    </Row>

    </Container>

    </Container>

    <Container className='p-0' style={{marginTop: 100, height: '100vh'}}>

    </Container>
 
    </>
  )
}

export default Home