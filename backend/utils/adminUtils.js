import Admin from "../models/adminModal.js"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";



export const authenticateAdmin = asyncHandler( async (data)=>{
    const {email,password} = data;
    let admin = await Admin.findOne({email})
     if(admin && (await admin.matchPassword(password))){
        return admin;
     }
     return false;
})

export const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find();
    if(users) return users
    return false;
})

export const createUser =asyncHandler(async (data)=>{
    const {name,email,password} = data;
    const userExist = await User.findOne({email})
    if(userExist) return false;
    const user = await User.create(
        {
            name,
            email,
            password
        }
    )
    return user;
})

export const editUsers = asyncHandler(async (data)=>{
    const {name,email,_id} = data;
    let user = await User.findById(_id)
    if(user){
        if(user.email != email){
            let userExist =await User.findOne({email:email})
            if(userExist){
                return false;
            }
        }
        user.name = name || user.name;
        user.email=email || user.email;
        const updatedUser = await user.save()
        return updatedUser;
   } 
    return false; 
}) 

