import express from "express"
import * as userController from "../controllers/userController.js" 
import { protect } from "../middlewares/authMiddleware.js";



const router = express.Router();
 
router.post('/',userController.registerUser)
router.post('/auth',userController.authUser);
router.post('/logout',userController.logoutUser);
router.route('/profile')
  .get(protect,userController.getUserProfile)
  .put(protect,userController.updateUserProfile)

export default router;



