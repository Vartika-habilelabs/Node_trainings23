import  express  from "express";
import fs from 'fs';
import https from 'https';

const app=express();
const port=8443;
const options ={
    key:fs.readFileSync('privatekey.key'),
    cert:fs.readFileSync('certificate.crt')
}
app.get('/',(req,res)=>{
    res.send("hello! secure express")
})
const server=https.createServer(options,app);

server.listen(port,(err)=>{
    console.log(`server is listening at port ${port}`)
})
