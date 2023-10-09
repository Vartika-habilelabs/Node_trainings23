const mongoose=require('mongoose')
const env=require('dotenv');
env.config();
// const uri="mongodb+srv://vartikadhoot:Nakbansah@cluster0.lugcfsf.mongodb.net/"

const uri=`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.lugcfsf.mongodb.net/`
const connectDB=()=>{
  return mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
}
module.exports=connectDB