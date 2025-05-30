const userModel=require('../db/models/user.models')


module.exports.createUser=async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('all field are required')
    }

    const user=userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })


    return user;
}