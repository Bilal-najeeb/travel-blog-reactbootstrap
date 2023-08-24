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
                            <div className="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                            {/* Post Tags */}
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                    </header>
                    {/* Preview image figure */}
                    <Figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></Figure>
                    {/* Post content */}
                    <section className="mb-5">
                        <p className="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                        <p className="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere, so there's no reason to think that Earth would be unique in that regard. Whether of not the life became intelligent is a different question, and we'll see if we find that.</p>
                        <p className="fs-5 mb-4">If you get asteroids about a kilometer in size, those are large enough and carry enough energy into our system to disrupt transportation, communication, the food chains, and that can be a really bad day on Earth.</p>
                        <h2 className="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                        <p className="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                        <p className="fs-5 mb-4">Venus has a runaway greenhouse effect. I kind of want to know what happened there because we're twirling knobs here on Earth without knowing the consequences of it. Mars once had running water. It's bone dry today. Something bad happened there as well.</p>
                    </section>
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