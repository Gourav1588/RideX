const userModel=require('../db/models/user.models')
const {validationResult}=require('express-validator')
const userservice=require('../services/user.service')

module.exports.registeruser=async(req,res,next)=>{
 
    
    // const error=validationResult(req);
    // if(!error.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})
    // }

    const {fullname,email,password}=req.body

    const hashedpassword=await userModel.hashPassword(password);

    const user=await userservice.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword

    })
const token=user.generateAuthToken();
res.status(201).json({ token, user });


}
