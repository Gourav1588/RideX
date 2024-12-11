const express=require('express')
const router=express.Router();
const {body}=require("express-validator")
const usercon=require('../controlers/user.con')
const auth=require('../middilware/auth.middleware')



router.post('/register',[
    body('email').isEmail().withMessage("invalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("first name must me more than three latters"),
    body('password').isLength({min:6}).withMessage("password must be more than 6 latters")



],
usercon.registeruser
)
router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be more than six latters')
],usercon.login)

router.get('/profile',auth.authuser,usercon.getprofile)
router.get('/logout',usercon.logout)

module.exports=router;