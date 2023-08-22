import React from 'react'

import { Container, Form, Row, Col } from 'react-bootstrap'
import BlogCard from '../../components/blogCards/BlogCard'
import cardData from '../../data/cardData'

const Home = () => {
  return (
    <>

    <Container className='py-5 d-flex justify-content-center'>
      <Form className="d-flex col-12 col-md-6">
        <Form.Control type='search' placeholder='search' aria-label="Search"/>
        <button type='submit' className="btn btn-outline-success">Search</button>
      </Form>
    </Container>

    <Container>
            <Row className='g-4'>
                {
                  cardData.map((data, index)=>{
                    return (
                      <Col lg="4" md="6" key={index}>
                        <BlogCard  image={data.image} title={data.title} content={data.content}/>
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