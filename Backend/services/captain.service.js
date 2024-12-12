const captainmodel=require('../db/models/captain.model')



module.exports.createCaptain=async({
    firstname,lastname,email,password,color,plate,capecity, vehicleType
})=>{
if(!firstname || !email || !password || !color || !plate || !capecity || !vehicleType)
{
    throw new Error("all field are  required")
}
const captain=captainmodel.create({
    fullname:{
        firstname,
        lastname
    },
   
    email,
    password,
    vehicle:{
        color,
        plate,
        capecity,
        vehicleType,

    }
})



return captain



}