import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
  name:{
    type:"String",
    required:true
  },
  email:{
    type :"String",
    required:true
  },
  password:{
    type:"String",
    required:true
  },
  refreshToken:{
    type:"String"
  }
},{timestamps:true})

userSchema.pre("save",async function(next){
  if (!this.isModified("password")) return next()
  this.password=await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  return  jwt.sign({id:this.id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.generateRefreshToken=function(){
  return  jwt.sign({id:this.id,name:this.name},process.env.REFRESH_SECRET,{expiresIn:process.env.REFRESH_EXPIRE})
}


export const User=mongoose.model('User',userSchema)
