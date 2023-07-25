import express from "express"
import * as userController from "../controllers/userController.js" 
import { protectUser } from "../middlewares/authMiddleware.js";



const router = express.Router();
 
router.post('/',userController.registerUser)
router.post('/auth',userController.authUser);
router.post('/logout',userController.logoutUser);
router.route('/profile')
  .get(protectUser,userController.getUserProfile)
  .put(protectUser,userController.updateUserProfile)

router.put('/image',protectUser,userController.profilePic)

export default router;



