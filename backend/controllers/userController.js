import asyncHandler from "express-async-handler"
import {generateUserToken} from "../utils/generateToken.js";
import { createUser ,authenticateUser} from "../utils/userUtils.js";
import User from "../models/userModel.js";
import multer from "multer";

//storage
const storage = multer.diskStorage({
  destination: function(req, file , cb){
    return cb (null, "../MERN-USERAUTH/backend/utils/uploads")
  },
  filename : function(req, file , cb){
    return cb (null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({storage})

export const basePath = (req,res)=>{
    res.status(200).json({message:"server is ready"})
}


export const authUser = asyncHandler(async(req,res)=>{

    const user = await authenticateUser(req.body)
    if(user){
     
      generateUserToken(res,user._id)
        res.status(201)
         .json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                image:user?.image
            }
         )
    }else{
       res.status(400)
       throw new Error("invalid email or password")
    }
    
});


export const registerUser = asyncHandler(async(req,res)=>{
    const user =await createUser(req.body)
    if(!user){
        res.status(400)
        throw new Error('User already exists')
    }
    if(user){
      generateUserToken(res,user._id)
        res.status(201)
         .json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                image:user?.image
            }
         )
    }else{
       res.status(400)
       throw new Error("invalid user data")
    }
    
});


export const logoutUser = asyncHandler(async(req,res)=>{
   res.cookie('jwtuser','',
   {
    httpOnly:true,
    expires:new Date(0)
   })
   res.status(200).json({message:'user logout successfully'})
});


export const getUserProfile = asyncHandler(async(req,res)=>{
    const user = req.user;
    res.status(200).json({message:"users profileee",user})
});




export const updateUserProfile = 
    asyncHandler
      (async (req, res)  => {
       const {name,email,password} = req.body;
        const user = await User.findById(req.user._id)
    
        if (user) {
          user.name = name || user.name;
          user.email = email || user.email;
      
          if (req.body.password) {
            user.password = password; 
          }
      
          const updatedUser = await user.save();
        
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image:updatedUser?.image,
          });
        } else {
          res.status(404);
          throw new Error('error updation');
        }

  })

 

  export const profilePic = (req,res)=>{
    upload.single('image')(req,res, async(err)=>{
       
        if (err) {
            res.status(400).json(err.message)
           }
           try {
            let user = await User.findOne(req.user._id);
            user.image = req.file.filename
            const updatedUser = await user.save();
           
            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              image:updatedUser.image
            });
           } catch (error) {
            res.status(404);
            throw new Error('error in image upload');
  
           }
     })
}

    

      
      
        
      