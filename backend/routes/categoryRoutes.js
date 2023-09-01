import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { createSubCategory, readSubCategory, updateSubCategory, deleteSubCategory,
         createCategory, readCategory, updateCategory, deleteCategory
} from '../controllers/categoryController.js';





router.post('/createcategory', createCategory);
router.get('/readcategory', readCategory);
router.put('/updatecategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);


router.post('/createsubcategory', createSubCategory);
router.get('/readsubcategory', readSubCategory);
router.put('/updatesubcategory/:id', updateSubCategory);
router.delete('/deletesubcategory/:id', deleteSubCategory);





export default router
