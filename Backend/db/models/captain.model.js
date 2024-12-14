const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname must be greater than three characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "lastname must be greater than three characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  soketid: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate must be at least 3 characters long"],
    },
    capecity: {
      type: Number,
      required: true,
      min: [1, "capacity must be more than one"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'bike', 'auto'],
    },
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

captainSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };
//   captainSchema.methods.comparePassword=async (password)=> {
// return await bcrypt.compare(password,this.password)

    
//   }

  captainSchema.methods.comparePassword = async function (password) {
    try {
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch; // Return the result of the comparison (true/false)
    } catch (err) {
        // Handle potential errors (e.g., if bcrypt fails)
        throw new Error('Error comparing passwords');
    }
};

const CaptainModel = mongoose.model('Captain', captainSchema);
module.exports = CaptainModel;
