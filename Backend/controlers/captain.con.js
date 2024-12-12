const captainModel = require('../db/models/captain.model');

const captainservice=require("../services/captain.service")
const {validationResult}=require('express-validator')


module.exports.register=async(req,res,next)=>{

    const error = validationResult(req); // Store the result of validation
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // Reference 'error', not 'errors'
    }

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
res.status(200).json({token,captain})
}