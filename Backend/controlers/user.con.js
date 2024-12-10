const userModel=require('../db/models/user.models')
const {validationResult}=require('express-validator')
const userservice=require('../services/user.service')

module.exports.registeruser=async(req,res,next)=>{
 
    
    const error = validationResult(req); // Store the result of validation
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    }
    
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
module.exports.login=async(req,res,next)=>{
    // const error = validationResult(req); // Store the result of validation
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    // }

    const {email,password}=req.body

    const user=await userModel.findOne({email}).select('+password')
 if(!user){
    return res.status(401).json({message:'invalid email or pss'})
 }

const ismatch=await user.comparePassword (password);
if(!ismatch){
    return res.status(401).json({message:'invalid email or pass'})
}
const token =user.generateAuthToken();
res.status(200).json({token,user})

}