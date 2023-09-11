import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import SubLocation from '../models/subLocationModel.js'





// @desc    Create a new blog
// route    POST /api/blogs/createblog
// @access  Private
const createBlog = asyncHandler( async (req, res) => {

    const {title, summary,content, category, location} = req.body;
    const blog_image = req.file.filename;

    console.log(title, summary, content, blog_image, category);
    if(!title || !summary || !content || !blog_image || !category || !location) {
        
        res.status(400);
        throw new Error("Fill all fields to create a blog post")
    }

    const author = req.user._id;

    const catId = await Category.findById(category);
    const locationId = await SubLocation.findById(location);

    if(!catId){
        res.status(404);
        throw new Error("Invalid blog category");
    }

    if(!locationId){
        res.status(404);
        throw new Error("Invalid location");
    }

    if(!author){
        res.status(400);
        throw new Error("Unauthorized, no token");
    }

    const blog = await Blog.create({
        author: author,
        title,
        summary,
        content,
        category: catId,
        blogImg: blog_image,
        location: locationId,
    })

    res.status(201).json(blog);
 
 }
 )
 


 // @desc    Read all Blogs
// route    GET /api/blogs/
// @access  Public
const getBlog = asyncHandler( async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const locationId = req.query.location || "";
  

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    const baseQuery = {};

    if(search){
        baseQuery.title = { $regex: search, $options: "i" }
    }

    if(category){
        baseQuery.category = category;
    }

    if(locationId){
        baseQuery.parentLocation = locationId;
    }

    
    
    console.log("base query",baseQuery);

    // Find all blogs that match the search query, skip and limit the results
    const totalBlogs = await Blog.countDocuments(baseQuery);
    const blogs = await Blog.find(baseQuery)
        .populate('author', 'name')
        .populate('category', 'name')
        .populate({
            path: 'location', // Populate the location field
            select: 'name',
            populate: {
              path: 'parentLocation', // Populate the parentLocation field within location
              select: 'name',
            },
          })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
            blogs,
            total: totalBlogs,
            //currentPage: page,
            //totalPages: Math.ceil(totalBlogs / limit),
          });
 
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

    
    const blog = await Blog.findById({_id: req.params.id})
                                    .populate('category', 'name')
                                    .populate('author', 'name');
    
    
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

   const catId = await Category.findById(req.body.category);

   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    category: catId,
    blogImg: req.body.files,

   }, {new:true})

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