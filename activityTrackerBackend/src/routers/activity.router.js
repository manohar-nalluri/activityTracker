import express from "express"
import verifyAuth from "../middlewares/auth.middleware.js"
import { createActivity, deleteActivity, endActivity, getActivities, pauseActivity, resumeActivity, startActivity } from "../controllers/activity.controller.js"

const router=express.Router()

router.post('/new',verifyAuth,createActivity)
router.get('/',verifyAuth,getActivities)
router.delete('/delete/:id',verifyAuth,deleteActivity)
router.patch('/start/:id',verifyAuth,startActivity)
router.patch('/pause/:id',verifyAuth,pauseActivity)
router.patch('/resume/:id',verifyAuth,resumeActivity)
router.patch('/end/:id',verifyAuth,endActivity)


export const activityRouter=router
