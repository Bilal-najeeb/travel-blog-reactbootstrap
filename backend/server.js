import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import path from 'path';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import locationRoutes from './routes/locationRoutes.js'


connectDB();



const app = express();

app.use(express.json());


//To access req.body and parse data
app.use(express.urlencoded({extended: true}));

//To access req.cookies
app.use(cookieParser());


app.use('/uploads',express.static('uploads'));

//User Routes
app.use('/api/users/', userRoutes);

//Blog Routes
app.use('/api/blogs/', blogRoutes)

//Category Routes
app.use('/api/categories/', categoryRoutes)

//Location Routes
app.use('/api/locations/', locationRoutes)

//Server Check
app.get('/', (req, res) => res.send('Server Ready'));


//Global Error Middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`Server started at ${port}`));







// USER ROUTES

// POST /api/users - Register a User
// POST /api/users/auth - Authenticate a User
// POST /api/users/logout - Logout a user and clear cookie
// GET /api/users/profile - Get user profile data
// PUT /api/users/profile - Update user profile data

// GET /api/users/blogs - Get user blog Data
// DELETE /api/users/blogs - Delete specific user Blogs


// BLOG ROUTES

// POST /api/blogs/createblog - Create a blog post
// GET /api/blogs/viewBlogID - View Specific blog post with matching user id
// 




