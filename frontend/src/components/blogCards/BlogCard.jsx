import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const baseBlogImageUrl = import.meta.env.VITE_BLOG_IMAGE_PATH;


const BlogCard = (props) => {
    const {title, content, user, blogId, blogImg, addDelete, myBlogDelete, addUpdate} = props;

    const path = `/viewpost/${blogId}`
    const updatePath = `/updatepost/${blogId}`

    const handleDelete = () => {
       
      myBlogDelete(blogId)
    }

  return (
    <>
      
                <Card style={{maxHeight: 550}}>
                        <Card.Img variant="top" src={blogImg ? `${baseBlogImageUrl}${blogImg}` : 'https://thumbs.dreamstime.com/b/no-thumbnail-image-148010362.jpg'} style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>
                        <Card.Body>
                            <Card.Title>{title.slice(0,25)}..</Card.Title>
                            <Card.Text><b>Posted by </b><span className='text-primary'>{user}</span></Card.Text>
                            <Card.Text>
                                {content.slice(0,30)}
                            </Card.Text>
                            <Link to={path}>
                              <Button variant='primary m-1'>View Blog</Button>
                            </Link>
                            {addUpdate ? (
                                <Link to={updatePath}>
                                  <Button variant='warning m-1'>Update Blog</Button>
                                </Link>
                              ) : ""}
                            {addDelete ? (
                                <Button onClick={handleDelete} variant='danger'>Delete Blog</Button>
                              ) : ""}
                        </Card.Body>
                    </Card>
                
    </>
  )

}

export default BlogCard


