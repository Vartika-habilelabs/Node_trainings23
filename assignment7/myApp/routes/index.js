
const express = require('express');
const router = express.Router();
const env=require('dotenv');
env.config();
router.get("/",(req,res)=>{
  res.render('index',{title:'Welcome',
port:process.env.PORT})
})

module.exports=router;