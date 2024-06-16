import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
// import verifyAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

//UnSecured Routes
router.post('/register',createUser)
router.post('/login',loginUser)
export const userRouter = router;

