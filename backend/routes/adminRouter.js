import express from "express"
import { adminLogin ,getAllUsers,createUserAdmin,editUsersAdmin,deleteUsers,logoutAdmin,getUser} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login',adminLogin)
router.post('/logout',logoutAdmin)


router.route('/users')
  .get(protectAdmin, getAllUsers)
  .post(protectAdmin,createUserAdmin)
  .delete(protectAdmin,deleteUsers)

router.route('/edit')
  .get(protectAdmin,getUser)
  .put(protectAdmin,editUsersAdmin)
  





export default router;      