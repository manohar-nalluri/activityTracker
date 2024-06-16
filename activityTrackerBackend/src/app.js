import cookieParser from "cookie-parser"
import express from "express"
import errorhandler from "./middlewares/errorHandler.middleware.js"
import cors from "cors"
const app=express()

app.use(cors({
  origin:  process.env.ALLOW_URL,
  credentials: true, 
  optionsSuccessStatus: 200
}));
//middlewares
app.use(express.json({
  limit:"16kb",
}))

app.use(express.urlencoded({extended:true,limit:"10kb"}))

app.use(cookieParser())

//routes imported here
import { userRouter } from "./routers/user.router.js"
import { activityRouter } from "./routers/activity.router.js"


//routing
app.use('/api/v1/user',userRouter)
app.use('/api/v1/activity',activityRouter)


//error handling middleware
app.use(errorhandler)
export default app
