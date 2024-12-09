const dotnev=require('dotenv')
dotnev.config();
const express=require("express")
const cors=require("cors")
const app=express()
const main=require('./db/db')

app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello')
})
module.exports =app;