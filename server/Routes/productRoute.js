import { Router } from "express";

import { upload } from "../multer/multer.js";
import {addProduct, productInfo, products} from '../controllers/productController.js'
const router=Router()


router.post("/addProduct",upload.single('image'),addProduct)
router.get("/products",products)
router.post("/productInfo",productInfo)



export default router