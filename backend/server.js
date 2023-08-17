import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;

import userRoutes from './routes/userRoutes.js'

connectDB();


const app = express();

app.use('/api/users/', userRoutes);


app.get('/', (req, res) => res.send('Server Ready'));


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




