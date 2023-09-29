import mongoose from "mongoose";

const uri="mongodb+srv://vartikadhoot:Nakbansah@cluster0.lugcfsf.mongodb.net/"
const connectDB=()=>{
  return mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
}
export default connectDB;