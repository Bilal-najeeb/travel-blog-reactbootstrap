import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { createCategory, readCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';





router.post('/createcategory', createCategory);
router.get('/readcategory', readCategory);
router.put('/updatecategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);





export default router
