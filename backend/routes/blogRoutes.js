import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { createBlog, getBlog, getSingleBlog, getUserBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'

import storageConfig from '../multerConfig.js';

// Set up Multer for blog images
const blogImageUpload = storageConfig('blog'); // Specify the subfolder name




router.post('/createblog', protect, blogImageUpload.single('blogImg'), createBlog);
router.get('/', getBlog);
router.get('/singleblog/:id', getSingleBlog);
router.get('/userblog', protect, getUserBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);



export default router
