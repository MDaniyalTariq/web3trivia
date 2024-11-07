import { ConnectionStates } from "mongoose";
import mongoose from "mongoose";
export const mongodb_uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!mongodb_uri) {
  throw new Error("MongoDB URI is not defined. Please set NEXT_PUBLIC_MONGODB_URI in your environment variables.");
}

const connectDB = async () => {
  const connectionstate=mongoose.connection.readyState;

  if (connectionstate===1) {
    return;
  }

  try{
    mongoose.connect(mongodb_uri,{
    })
  }
  catch(error){
    console.log("error in connection",error);
    throw new Error("Error Connecting to DB")

  }
};

export default connectDB