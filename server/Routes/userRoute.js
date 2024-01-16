import { Router } from "express";
import { checkUserLoggedIn, userLogin, userLogout, userRegister } from "../controllers/userController.js";
const router=Router()


router.get("/checkAuth",checkUserLoggedIn)
router.post('/userRegister',userRegister)
router.post('/userLogin',userLogin)
router.get('/userLogout',userLogout)




export default router