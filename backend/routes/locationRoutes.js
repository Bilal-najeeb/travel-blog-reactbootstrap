import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { 
         createLocation, readLocation, updateLocation, deleteLocation, createSubLocation, readSubLocation
} from '../controllers/locationController.js';





router.post('/createlocation', createLocation);
router.get('/readlocation', readLocation);
router.put('/updatelocation/:id', updateLocation);
router.delete('/deletelocation/:id', deleteLocation);

router.post('/createsublocation', createSubLocation);
router.get('/readsublocation', readSubLocation);







export default router
