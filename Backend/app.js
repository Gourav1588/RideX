const dotnev=require('dotenv')
dotnev.config();
const express=require("express")
const cors=require("cors")
const app=express()
const main=require('./db/db')
app.use(express.json())
const userRoute=require('./routes/user.routes')

app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/users',userRoute)

module.exports =app;