const blacklistTokenModel = require('../db/models/blacklistToken.model');
const CaptainModel = require('../db/models/captain.model');
const userModel = require('../db/models/user.models');
const jwt = require('jsonwebtoken');

module.exports.authuser = async (req, res, next) => {
    try {
        // Safely extract the token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: "Authentication token is required" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            console.log('Token is blacklisted');
            return res.status(401).json({ message: "Session expired. Please sign in again" });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.log('JWT verification failed:', jwtError.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (!decoded._id) {
            console.log('Token payload missing user ID');
            return res.status(401).json({ message: "Invalid token payload" });
        }

        // Fetch user from the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            console.log('User not found for ID:', decoded._id);
            return res.status(404).json({ message: "User account not found" });
        }

        // Log successful authentication
        console.log('User authenticated:', user._id);

        // Attach user to request and proceed
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(500).json({ message: "Authentication failed", error: err.message });
    }
}

module.exports.authcaptain = async (req, res, next) => {
    try {
        // Safely extract the token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: "Authentication token is required" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            console.log('Token is blacklisted');
            return res.status(401).json({ message: "Session expired. Please sign in again" });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.log('JWT verification failed:', jwtError.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (!decoded._id) {
            console.log('Token payload missing user ID');
            return res.status(401).json({ message: "Invalid token payload" });
        }

        // Fetch captain from the database
        const captain = await CaptainModel.findById(decoded._id);
        if (!captain) {
            console.log('Captain not found for ID:', decoded._id);
            return res.status(404).json({ message: "Captain account not found" });
        }

        // Log successful authentication
        console.log('Captain authenticated:', captain._id);

        // Attach captain to request and proceed
        req.captain = captain;
        req.token = token;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(500).json({ message: "Authentication failed", error: err.message });
    }
}
