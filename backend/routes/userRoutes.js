import express from 'express';
const router = express.Router();

import { validationRules, validatonMiddleware } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

import { 
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updatetUserProfile
 } from '../controllers/userController.js';



router.post('/', validationRules, validatonMiddleware, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updatetUserProfile);



export default router;