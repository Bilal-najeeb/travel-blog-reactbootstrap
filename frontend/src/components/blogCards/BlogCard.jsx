import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
    const {title, content, user, blogId, blogImg, addDelete, myBlogDelete, addUpdate} = props;

    const path = `/viewpost/${blogId}`
    const updatePath = `/updatepost/${blogId}`

    const handleDelete = () => {
       
      myBlogDelete(blogId)
    }

  return (
    <>
      
                <Card>
                        <Card.Img variant="top" src={blogImg} style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>
                        <Card.Body>
                            <Card.Title>{title.slice(0,30)}..</Card.Title>
                            <Card.Text><b>Posted by </b><span className='text-primary'>{user}</span></Card.Text>
                            <Card.Text>
                                {content.slice(0,30)}
                            </Card.Text>
                            <Link to={path}>
                              <Button variant='primary'>View Blog</Button>
                            </Link>
                            {addUpdate ? (
                                <Link to={updatePath}>
                                  <Button variant='warning mx-2'>Update Blog</Button>
                                </Link>
                              ) : ""}
                            {addDelete ? (
                                <Button onClick={handleDelete} variant='danger mt-3'>Delete Blog</Button>
                              ) : ""}
                        </Card.Body>
                    </Card>
                
    </>
  )

}

export default BlogCard


