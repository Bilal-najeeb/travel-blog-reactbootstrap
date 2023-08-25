import React, { useEffect } from 'react'
import { Container, Row, Col, Figure, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router'


import {useSelector} from 'react-redux'



const ViewPost = () => {

    const {id} = useParams();
    

    const {blogData} = useSelector((state)=>state.blog);
    const viewData = blogData.filter((item)=> item._id === id);
    
    useEffect(()=>{
        
        console.log("data:", blogData);
        console.log(id);
        console.log(viewData);
    },[])


  return (
    <Container className='py-5'>
        <Row className='flex-wrap-reverse'>
            {viewData?.map((item, index)=>{return (
                <Col lg="8" key={index}>
                <article>
                    <header className="mb-4">
                            {/* Post Header */}
                            <h1 className="fw-bolder mb-1">{item.title}</h1>
                            {/* Post Date */}
                            <div className="text-muted fst-italic mb-2">Posted on {item.updatedAt.slice(0,10)} by {item.author.name}</div>
                            {/* Post Tags */}
                            <a className="badge bg-secondary text-decoration-none link-light fs-6" href="#!">{item.category}</a>
                    </header>
                    {/* Preview image figure */}
                    <Figure className="mb-4"><img className="img-fluid rounded" src={item.blogImg} alt="..."  style={{ width: '500px', height: '250px', objectFit: 'cover' }}/></Figure>
                    {/* Post content */}
                    <div dangerouslySetInnerHTML={{__html:item.content}}/>
                </article>
            </Col>
            )})}
            <Col lg="4">
               <Card className='mb-4'>
               <Card.Header>Search Blogs</Card.Header>
               <Card.Body>
                <InputGroup>
                    <Form.Control type='text' placeholder='Enter Search Term' aria-label="Enter search term..." aria-describedby="button-search"/>
                    <Button className="btn btn-primary" id="button-search" type="button">Go!</Button>
                </InputGroup>
               </Card.Body>

               </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ViewPost