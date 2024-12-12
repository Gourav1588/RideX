const blacklistTokenModel = require('../db/models/blacklistToken.model');
const userModel = require('../db/models/user.models');
const jwt = require('jsonwebtoken');

module.exports.authuser = async (req, res, next) => {
    try {
        // Safely extract the token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }
        const isblack= await  blacklistTokenModel.findOne({token:token})
        if(isblack){
            res.status(404).json({message:"first sign in"})
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from the database
        const user = await userModel.findById(decoded._id); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        

        // Attach user to request and proceed
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message); // Log the error for debugging
        return res.status(401).json({ message: "Unauthorized access", error: err.message });
    }
};
