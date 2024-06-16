import { status } from "../constants.js";
import { Activity } from "../models/activity.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createActivity = asyncHandler(async(req,res,next)=>{
  const id=req.id
  const {name}=req.body 
  const created=await Activity.create({name,userId:id})
  return res.status(200).json(new APIResponse(200,"Activity created Succesfully",created))
})

const getActivities= asyncHandler(async(req,res,next)=>{
  const id=req.id
  const activits=await Activity.find({userId:id})
  res.status(200).json(new APIResponse(200,"Activities fetched succesfully",{activits,user:req.user.name}))
})

const deleteActivity =asyncHandler(async(req,res,next)=>{
  const userId=req.id

  const {id}=req.params
  const deleted =await Activity.findOneAndDelete({_id:id,userId})
  if (!deleted) throw new APIError(409,"Document not found for that user")
  res.status(200).json(new APIResponse(200,"Activity deleted successfully",deleted))
})

const startActivity = asyncHandler(async(req,res,next)=>{
  const userId=req.id
  const {id}=req.body || req.params
  console.log(req.body,req.params)
  const toStartActivity=await Activity.findOne({userId,_id:id})
  if(!toStartActivity) throw new APIError(400,"Cannot find the Activity")
  if(toStartActivity.duration!==0 && (toStartActivity.start)) throw new APIError(400,"Activity already started it can only be resumed")
  const activies=await Activity.find({userId})
  const isAnActivityStarted=activies.some(activity=>activity.status===status.START || activity.status===status.RESUME)
  if (isAnActivityStarted) throw new APIError(400,"There is an already running Activity")
  toStartActivity.status=status.START
  toStartActivity.start=Date.now()
  toStartActivity.save()
  res.status(200).json(new APIResponse(200,"started",toStartActivity))
})

const pauseActivity = asyncHandler(async(req,res,next)=>{
  const userId=req.id
  const {id}=req.body || req.params
  const runningActivity=await Activity.findOne({userId,_id:id})
  if(!runningActivity) throw new APIError(400,"Activity not found")
  if(runningActivity.status===status.END) throw new APIError(400,"Cannot pause ended activity")
  if(runningActivity.status===status.PAUSE) throw new APIError(400,"Activity already passed")
  let duration
  if(runningActivity.status===status.START){
    duration=Math.floor((Date.now()-runningActivity.start)/1000)
  }
  else{
    duration=Math.floor((Date.now()-runningActivity.previousResume)/1000)
  }
  runningActivity.status=status.PAUSE
  runningActivity.duration+=duration
  runningActivity.save()
  res.status(200).json(new APIResponse(200,"Activity paused",runningActivity))
})

const resumeActivity =asyncHandler(async(req,res,next)=>{
  const userId=req.id
  const {id}=req.body || req.params
  const pausedActivity=await Activity.findOne({userId,_id:id})
  if(!pausedActivity.start && pausedActivity.duration===0) throw new APIError(400,"First start the activity")
  if(pausedActivity.status===status.START || pausedActivity.status===status.RESUME) throw new APIError(400,"Already running")
  if(pausedActivity.status===status.END) throw new APIError(400,"Activity already ended")
  const activies=await Activity.find({userId})
  const isAnActivityStarted=activies.some(activity=>activity.status===status.START || activity.status===status.RESUME)
  if (isAnActivityStarted) throw new APIError(400,"There is an already running Activity")

  pausedActivity.status=status.RESUME
  pausedActivity.previousResume=Date.now()
  pausedActivity.save()
  res.status(200).json(new APIResponse(200,"Activity resumed",pausedActivity))
})

const endActivity = asyncHandler(async(req,res,next)=>{
  const userId=req.id
  const {id}=req.body || req.params
  const endActivity=await Activity.findOne({userId,_id:id})
  if(!endActivity) throw new APIError(400,"No activity found")
  if(!endActivity.start) throw new APIError(400,"You need to start an activity to end it")
  var duration
  if(endActivity.status===status.START){
    duration=Math.floor((Date.now()-endActivity.start)/1000)
  }
  else{
    duration=Math.floor((Date.now()-endActivity.previousResume)/1000)
  }
  endActivity.status=status.END
  endActivity.duration+=duration
  endActivity.end=Date.now()
  endActivity.save()
  res.status(200).json(new APIResponse(200,"Activity ended",endActivity))
})

export {createActivity,getActivities,deleteActivity,startActivity,pauseActivity,resumeActivity,endActivity}
