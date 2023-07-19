import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Admin from '../models/adminModal.js';

export const protectUser = asyncHandler(async (req,res,next)=>{
    let token;
    token = req.cookies.jwtuser;
   if(token){
        try {
           const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorised , invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorised , no token')
    }
})

export const protectAdmin = asyncHandler(async (req,res,next)=>{
    let token;
    token = req.cookies.jwtadmin;
   if(token){
        try {
           const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.admin = await Admin.findById(decoded.adminId).select('-password');
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorised , invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorised , no token')
    }
})

