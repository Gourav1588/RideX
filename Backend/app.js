const dotnev=require('dotenv')
dotnev.config();
const express=require("express")
const cors=require("cors")
const app=express()
const main=require('./db/db')
app.use(express.json())
const userRoute=require('./routes/user.routes')
const captainroutes=require("./routes/captain.routes")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mapRoutes=require('./routes/maps.routes')


app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/users',userRoute)
app.use('/captains',captainroutes)
app.use('/maps', mapRoutes);


module.exports =app;