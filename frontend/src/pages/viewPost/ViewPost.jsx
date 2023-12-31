import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Figure, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router'

import axios from 'axios'
import {useSelector} from 'react-redux'
import BlogCard from '../../components/blogCards/BlogCard'
import { useNavigate } from 'react-router'

const baseBlogImageUrl = import.meta.env.VITE_BLOG_IMAGE_PATH;


const ViewPost = () => {

    const {id} = useParams();
    const [singleBlogData, setSingleBlogData] = useState('');
    const [otherBlogs, setOtherBlogs] = useState([]);
    
    const {userInfo} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    //const {blogData} = useSelector((state)=>state.blog);
    //const viewData = blogData.filter((item)=> item._id === id);
    
    

    const singleBlogApi = async () => {
       
        try {
            const res = await axios.get(`http://localhost:3000/api/blogs/singleblog/${id}`);
            const data = await res.data;
            console.log(data);
            setSingleBlogData(data);

        } catch (error) {
            console.log(error);
                }
    }

    const blogsApi = async (e) => {
        e?.preventDefault();
    
        const res = await axios.get(`http://localhost:3000/api/blogs/`);
        const data = await res.data;
        setOtherBlogs(data.blogs);
        console.log(data);
      }

    



    useEffect(()=>{
        singleBlogApi();
        blogsApi();
        //console.log("data:", blogData);
        //console.log(id);
        //console.log(viewData);

    },[id])


    const viewOtherBlogs = otherBlogs.filter((item)=> item._id !== id && item.category[0]?.name === singleBlogData?.category[0]?.name);


  return (
    <Container className='py-5'>
        <Row className='flex-wrap justify-content-between'>

                {singleBlogData && 
            <Col lg="7">
                <article>
                    <header className="mb-4">
                            {/* Post Header */}
                            <h1 className="fw-bolder mb-1">{singleBlogData.title}</h1>
                            {/* Post Date */}
                            <div className="text-muted fst-italic mb-2">Posted on {singleBlogData.createdAt.slice(0,10)} by {singleBlogData.author.name}</div>
                            {/* Post Tags */}
                            <a className="badge bg-secondary text-decoration-none link-light fs-6" href="#!">{singleBlogData?.category[0]?.name}</a>
                    </header>
                    {/* Preview image figure */}
                    <Figure className="mb-4"><img className="img-fluid rounded" src={singleBlogData.blogImg ? `${baseBlogImageUrl}${singleBlogData.blogImg}` : 'https://thumbs.dreamstime.com/b/no-thumbnail-image-148010362.jpg'} alt="..."  style={{ width: '500px', height: '250px', objectFit: 'cover' }}/></Figure>
                    {/* Post content */}
                    <div dangerouslySetInnerHTML={{__html:singleBlogData.content}}/>
                </article>
            </Col>}

            <Col lg="3">
               <Card className='mb-4'>
               <Card.Header>Search Blogs</Card.Header>
               <Card.Body>
                <InputGroup>
                    <Form.Control type='text' placeholder='Enter Search Term' aria-label="Enter search term..." aria-describedby="button-search"/>
                    <Button className="btn btn-primary" id="button-search" type="button">Go!</Button>
                </InputGroup>
               </Card.Body>

               </Card>

                 {viewOtherBlogs?.map((data,index)=>{return(
                    <Col key={index} className='mb-3'>
                    <BlogCard user={data.author.name} blogImg={data.blogImg}  title={data.title} content={data.summary} blogId={data._id}/>
                    </Col>
                )})}
               

                {userInfo?._id == singleBlogData?.author?._id && <Col>
                        <Button variant='warning' onClick={()=>navigate(`/updatepost/${id}`)}>Edit Blog</Button>
                    </Col>}
            </Col>
            
        </Row>
    </Container>
  )
}

export default ViewPost