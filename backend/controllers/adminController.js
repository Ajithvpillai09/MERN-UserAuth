import asyncHandler from "express-async-handler"
import {authenticateAdmin,getUsers,createUser,editUsers} from "../utils/adminUtils.js"
import { generateAdminToken } from "../utils/generateToken.js"
import User from "../models/userModel.js"


export const adminLogin = asyncHandler(async (req,res)=>{
    
   const admin = await authenticateAdmin(req.body)
   if(admin){
    generateAdminToken(res,admin._id)
    // const users = await User.find({isBlocked:false})
    res.status(200)
    .json({

        _id:admin._id,
        name:admin.name,
        email:admin.email,
        admin:true
     }) 
   }else{
    res.status(400)
       throw new Error("invalid email or password")
   }

})

export const getAllUsers = asyncHandler(async (req,res)=>{
 
    const users= await getUsers();
    if(users) {
        res.status(200).json(users)
    }else{
    res.status(400)
    throw new Error("no users found")
}

})

export const createUserAdmin = asyncHandler(async (req,res)=>{
  
    const user = await createUser(req.body)
    if(!user){
        res.status(400)
        throw new Error('User already exists')
    }
    if(user){
        res.status(201)
        .json(
           {
               _id:user._id,
               name:user.name,
               email:user.email,
             
           }
        )
    }else{
        res.status(400)
        throw new Error("invalid user data")

    }
})

export const editUsersAdmin = asyncHandler(async (req,res)=>{
    
    const updatedUser =await editUsers(req.body)
    if(updatedUser){
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            message:"user updated successfully"
          });

    }else {
        res.status(404);
        throw new Error('email already exists');
      }
})

export const deleteUsers = asyncHandler (async(req,res)=>{
   
     await User.deleteOne({ _id: req.query.id });
  
    res.status(200).json({message:"user deleted successfully",id:req.query.id})
})

export const getUser = asyncHandler(async (req,res)=>{
    let user = await User.findOne({_id:req.query.id})
    if(user) res.status(200).json(user)
    else throw new Error('cant delete user')
})

export const logoutAdmin = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',
    {
     httpOnly:true,
     expires:new Date(0)
    })
    res.status(200).json({message:'admin logout successfully'})
 });



