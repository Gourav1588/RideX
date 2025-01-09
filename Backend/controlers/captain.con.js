const captainModel = require('../db/models/captain.model');

const captainservice=require("../services/captain.service")
const {validationResult}=require('express-validator')
const blacklistToken=require("../db/models/blacklistToken.model")

module.exports.register=async(req,res,next)=>{

    // const error = validationResult(req); // Store the result of validation
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    // }

const {fullname,email,password,vehicle}=req.body;

const isCaptainAll = await captainModel.findOne({ email });
if (isCaptainAll) {
    return res.status(400).json({
        message: "Captain already exists",
    });
}


const hashedPassword = await captainModel.hashPassword(password);

const captain=await captainservice.createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capecity:vehicle.capecity,
    vehicleType:vehicle.vehicleType

})

const token=captain.generateToken();
  return res.status(201).json({token,captain})
}

module.exports.login=async(req,res)=>{

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    }
    const {email,password}=req.body
    const captain=await captainModel.findOne({email}).select('+password')
    if(!captain){
       return res.status(401).json({message:'invalid email or pss'})
    }
const comparePassword=captain.comparePassword(password)
if(!comparePassword){
    res.status(404).json({ msg:"invalid pass"})
}


const token =captain.generateToken ();
// res.cookie('token',token);

 return res.status(201).json({token,captain})

}



module.exports.getprofile=async(req,res,next)=>{
    res.status(200).json(req.captain)
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
module.exports.logout = async (req, res) => {
    
    res.clearCookie('token');
    
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);
    if(!token){
        res.status(404).json({message:"token req in logout"})
    }

    
    await blacklistToken.create({ token });

    
    res.status(200).json({ message: "Logged out successfully" });
};
