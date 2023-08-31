import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';


const isAdmin = asyncHandler(async (req, res, next)=> {

    if (req.user.role == 'user'){
        res.status(401);
        throw new Error("Unauthorized, Admin Route!");
    } else {
        next();
    }


})


export {isAdmin}