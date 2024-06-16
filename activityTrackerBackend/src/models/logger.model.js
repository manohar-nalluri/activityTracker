import mongoose from "mongoose";

const loggerSchema =new mongoose.Schema({},{timestamps:true})

export const Logger=mongoose.model("Logger",loggerSchema)
