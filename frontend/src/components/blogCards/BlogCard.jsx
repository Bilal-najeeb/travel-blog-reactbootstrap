import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
    const {title, content, user, blogId, blogImg} = props;

    const path = `/viewpost/${blogId}`

  return (
    <>
      
                <Card>
                        <Card.Img variant="top" src={blogImg} style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text><b>Posted by </b><span className='text-primary'>{user}</span></Card.Text>
                            <Card.Text>
                                {content}
                            </Card.Text>
                            <Link to={path}>
                              <Button variant='primary'>View Blog</Button>
                            </Link>

                        </Card.Body>
                    </Card>
                
    </>
  )

}

export default BlogCard


