import express from 'express';
const router = express.Router();

import { 
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updatetUserProfile
 } from '../controllers/userController.js';


router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updatetUserProfile);



export default router;