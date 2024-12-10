const express=require('express')
const router=express.Router();
const {body}=require("express-validator")
const usercon=require('../controlers/user.con')



router.post('/register',[
    body('email').isEmail().withMessage("invalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("first name must me more than three latters"),
    body('password').isLength({min:6}).withMessage("password must be more than 6 latters")



],
usercon.registeruser
)




module.exports=router;