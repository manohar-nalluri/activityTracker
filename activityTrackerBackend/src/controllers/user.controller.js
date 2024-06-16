import { accessCookieOptions,  refreshCookieOption } from "../constants.js";
import { User } from "../models/user.modle.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAcessAndRefreshToken=async(newUser)=>{
  const accessToken=await newUser.generateAccessToken()
  const refreshToken=await newUser.generateRefreshToken()
  newUser.refreshToken=refreshToken
  newUser.save()
  return {newUser,accessToken,refreshToken}
}

const createUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body
  const isExists=await User.findOne({email})
  if(isExists) throw new APIError(409,"user already exists")
  const user=await User.create({name,email,password})
  const data=user.toObject()
  delete data.password
  return res.status(201)
  .json(new APIResponse(201,"user successfully created",data))
})


const loginUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body
  if (email=="" || password=="")  throw new APIError(400,"Required email and password")
  const user=await User.findOne({email})
  if(!user) throw new APIError(400,"User doesnt exists please singup")
  const validatePassword=await user.comparePassword(password)
  if(!validatePassword) throw new APIError(409,"Incorrect password or email")
  const {newUser,accessToken,refreshToken}=await generateAcessAndRefreshToken(user)
  const data=newUser.toObject()
  delete data.password
  return res
    .status(200)
    .cookie("accessToken",accessToken,accessCookieOptions)
    .cookie("refreshToken",refreshToken,refreshCookieOption)
    .json(new APIResponse(200,"user successfully logged in",{...data,accessToken}))
})

export {createUser,loginUser}
