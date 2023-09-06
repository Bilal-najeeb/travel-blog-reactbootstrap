import express from 'express';
const router = express.Router();

import { validationRules, validatonMiddleware } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

import storageConfig from '../multerConfig.js';

import { 
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updatetUserProfile,
    updatetUserProfileImage,

    getAllUsers,
    getUserFromAdmin,
    deleteAUser,
    softDeleteAUser,
    updateSingleAdmin,
 } from '../controllers/userController.js';



// Set up Multer for profile images
const profileImageUpload = storageConfig('user'); // Specify the subfolder name





/* USER ROUTES */
router.post('/', validationRules, validatonMiddleware, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updatetUserProfile);
router.put('/profile/image', profileImageUpload.single('profileImage'), protect, updatetUserProfileImage);

/* ADMIN ROUTES */
router.get('/profile/all', protect, isAdmin, getAllUsers);
router.get('/profile/single/:id', protect, isAdmin, getUserFromAdmin);
router.delete('/profile/delete/:id', protect, isAdmin, deleteAUser);
router.put('/profile/soft-delete/:id', protect, isAdmin, softDeleteAUser);
router.put('/profile/updatesingle', protect, isAdmin, updateSingleAdmin);



export default router;