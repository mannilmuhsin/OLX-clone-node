import AsyncHandler from "express-async-handler";
import productModel from "../model/productModel.js";
import User from "../model/userModel.js";

export const addProduct = AsyncHandler(async (req, res) => {
  const image = req.file;

  await productModel.create({
    ...req.body,
    category: req.body.category,
    image,
  });
  res.json({ message: "product added" });
});
export const products=AsyncHandler(async(req,res)=>{
    const products=await productModel.find()
    res.json({products})
})
export const productInfo=AsyncHandler(async(req,res)=>{
    const product=await productModel.findById({_id:req.body.id})

    const user=await User.findById(product.userId)
   
    res.json({product,user})
})