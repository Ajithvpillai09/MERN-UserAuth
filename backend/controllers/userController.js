import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import { createUser ,authenticateUser} from "../utils/userUtils.js";
 
export const basePath = (req,res)=>{
    res.status(200).json({message:"server is ready"})
}

//@desc Authenticate user
//route POST/api/users/auth
//access PUBLIC
export const authUser = asyncHandler(async(req,res)=>{
    const user = await authenticateUser(req.body)
    if(user){
        generateToken(res,user._id)
        res.status(201)
         .json(
            {
                _id:user._id,
                name:user.name,
                email:user.email
            }
         )
    }else{
       res.status(400)
       throw new Error("invalid email or password")
    }
    
});

//@desc Register user
//route POST/api/users
//access PUBLIC
export const registerUser = asyncHandler(async(req,res)=>{
    const user =await createUser(req.body)
    if(!user){
        res.status(400)
        throw new Error('User already exists')
    }
    if(user){
        generateToken(res,user._id)
        res.status(201)
         .json(
            {
                _id:user._id,
                name:user.name,
                email:user.email
            }
         )
    }else{
       res.status(400)
       throw new Error("invalid user data")
    }
    
});

//@desc Logout user
//route POST/api/users/logout
//access PUBLIC
export const logoutUser = asyncHandler(async(req,res)=>{
   res.cookie('jwt','',
   {
    httpOnly:true,
    expires:new Date(0)
   })
   res.status(200).json({message:'user logout successfully'})
});

//@desc user Profile
//route GET/api/users/profile
//access PRIVATE
export const getUserProfile = asyncHandler(async(req,res)=>{
    const user = req.user;
    res.status(200).json({message:"users profileee",user})
});

//@desc update user profile
//route PUT/api/users/profile
//access PRIVATE
export const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"nUpdate users profileee"})
});