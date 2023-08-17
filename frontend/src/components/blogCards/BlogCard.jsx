import React from 'react'
import { Button, Card } from 'react-bootstrap'

const BlogCard = (props) => {
    const {image, title, content} = props;
  return (
    <>
      
                <Card>
                        <Card.Img variant="top" src={image}/>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {content}
                            </Card.Text>
                            <Button href='/viewpost' variant='primary'>View Blog</Button>
                        </Card.Body>
                    </Card>
                
    </>
  )

}

export default BlogCard


