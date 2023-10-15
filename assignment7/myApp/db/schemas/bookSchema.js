const mongoose=require('mongoose')

const bookSchema =new mongoose.Schema({
    id:String,
    name:String,
    author:String
})

const Book=mongoose.model("Books",bookSchema);

module.exports=Book