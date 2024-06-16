import mongoose from "mongoose";

const connectDB=async()=>{
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
}

export default connectDB
