const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters'],
        },
    },
    email: {
        type: String,
        minlength: [4, "Email must be at least 4 characters"],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
});



userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to hash password
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
