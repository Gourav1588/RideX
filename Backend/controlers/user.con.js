const userModel=require('../db/models/user.models')
const {validationResult}=require('express-validator')
const userservice=require('../services/user.service')
const blacklistToken=require('../db/models/blacklistToken.model')

module.exports.registeruser=async(req,res,next)=>{
 
    
    // const error = validationResult(req); // Store the result of validation
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    // }
    
    const {fullname,email,password}=req.body
    const userall= await userModel.findOne({email})
    if(userall){
        return  res.status(400).json({message:"user all exist"})
    }

    const hashedpassword=await userModel.hashPassword(password);

    const user=await userservice.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword

    })

    // console.log(user)
const token=user.generateAuthToken();
 return res.status(201).json({ token, user });



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
// res.cookie('token',token);
 return res.status(201).json({token,user})

}
module.exports.getprofile=async(req,res,next)=>{
    res.status(200).json(req.user)
}
module.exports.logout = async (req, res) => {
    
    res.clearCookie('token');
    
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);
    if(!token){
        res.status(404).json({message:"token req in logout"})
    }

    
    await blacklistToken.create({ token });

    
    res.status(200).json({ message: "Logged out successfully" });
};
