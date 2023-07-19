import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";



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

export const authenticateUser = asyncHandler( async (data)=>{
    const {email,password} = data;
    let user = await User.findOne({
        email:email,
    })
     if(user && (await user.matchPassword(password))){
        return user;
     }
     return false;
})