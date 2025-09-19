import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  }catch(err){

  }
}
export default connectDB;