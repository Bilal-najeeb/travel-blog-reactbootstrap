import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';







// @desc    Create a new blog
// route    POST /api/blogs/createblog
// @access  Private
const createBlog = asyncHandler( async (req, res) => {

    const {title, summary,content, blogImg, category} = req.body;
    console.log(title, summary, content, blogImg, category);
    if(!title || !summary || !content || !blogImg || !category) {
        
        res.status(400);
        throw new Error("Fill all fields to create a blog post")
    }

    const author = req.user._id;



    if(!author){
        res.status(400);
        throw new Error("Unauthorized, no token");
    }

    const blog = await Blog.create({
        author: author,
        title,
        summary,
        content,
        category,
        blogImg,
    })

    res.status(200).json(blog);
 
 }
 )
 


 // @desc    Read all Blogs
// route    GET /api/blogs/
// @access  Public
const getBlog = asyncHandler( async (req, res) => {



    const search = req.query.search || "";

    // Use a conditional query based on whether a search term is provided
    const blogQuery = search ? { title: { $regex: search, $options: "i" } } : {};

    const findByTitle = await Blog.find(blogQuery).populate('author', 'name');

    res.status(200).json(findByTitle);
 
 }
 )


  // @desc    Get user Blogs
// route    GET /api/blogs/userblog
// @access  Private
const getUserBlog = asyncHandler( async (req, res) => {

    const blogs = await Blog.find({author: req.user.id}).populate('author', 'name');
    
    res.status(200).json(blogs);
 
 }
 )

   // @desc    Get single Blog
// route    GET /api/blogs/:id
// @access  Private
const getSingleBlog = asyncHandler( async (req, res) => {

    
    const blog = await Blog.findById({_id: req.params.id}).populate('author', 'name');
    
    
    if (!blog){
        res.status(404);
        throw new Error('Blog not found');
    }


    res.status(200).json(blog);

 
 }
 )




// @desc    Update your Blog
// route    PUT /api/blogs/updateblog
// @access  Private
const updateBlog = asyncHandler( async (req, res) => {

   const blog = await Blog.findById(req.params.id);

   if(!blog){
    res.status(400);
    throw new Error('Blog not found');
   }

   const user = await User.findById(req.user._id);

   //check for user
   if(!user) {
    res.status(401);
    throw new Error('User not found')
   }

   //check that author and logged in user are same
   if(blog.author.toString() !== user.id){
    res.status(401);
    throw new Error('User not authorized')
   }

   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedBlog);
 
 }
 )


 // @desc    Delete your Blog
// route    DELETE /api/blogs/deleteblog
// @access  Private
const deleteBlog = asyncHandler( async (req, res) => {

   

   const blog = await Blog.findById(req.params.id);

   if(!blog){
    res.status(400);
    throw new Error('Blog not found');
   }

   const user = await User.findById(req.user._id);

   //check for user
   if(!user) {
    res.status(401);
    throw new Error('User not found')
   }

   //check that author and logged in user are same
   if(blog.author.toString() !== user.id){
    res.status(401);
    throw new Error('User not authorized')
   }

    await blog.deleteOne();

    res.status(200).json({id: req.params.id});
 
 }
 )




 
export { createBlog, getBlog, getSingleBlog, getUserBlog, updateBlog, deleteBlog }