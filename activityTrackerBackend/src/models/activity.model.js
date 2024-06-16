import mongoose from "mongoose";
import { status } from "../constants.js";

const activitySchema=new mongoose.Schema({
  name:{
    type:"String",
    required:true
  },
  status:{
    type:"String",
    enum:[status.START,status.END,status.PAUSE,status.RESUME],
    default:status.PAUSE
  },
  start:{
    type:Date,
  },
  end:{
    type:Date,
  },
  duration:{
    type:Number,
    default:0
  },
  previousResume:{
    type:Date,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true})

activitySchema.methods.checkUser=async(user)=>{
  return this.userId==user
}

export const Activity=mongoose.model('Activity',activitySchema)
