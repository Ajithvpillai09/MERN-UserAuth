import express from "express"
import { adminLogin ,getAllUsers,createUserAdmin,editUsersAdmin,deleteUsers,logoutAdmin} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/login',adminLogin)
router.post('/logout',logoutAdmin)


router.route('/users')
  .get(protectAdmin, getAllUsers)
  .post(protectAdmin,createUserAdmin)
  .put(protectAdmin,editUsersAdmin)
  .delete(protectAdmin,deleteUsers)
  





export default router;      