import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { createBlog, getBlog, getUserBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'






router.post('/createblog', protect, createBlog);
router.get('/', getBlog);
router.get('/userblog', protect, getUserBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);



export default router
