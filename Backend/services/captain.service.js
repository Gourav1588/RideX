const captainmodel = require('../db/models/captain.model');



module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capecity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capecity || !vehicleType) {
        throw new Error("all fields are required")
    }

    // Create captain with proper GeoJSON location format
    const captain = await captainmodel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capecity,
            vehicleType,
        },
        // Initialize location as a GeoJSON Point
        location: {
            type: 'Point',
            coordinates: [0, 0]  // Default coordinates [longitude, latitude]
        }
    });

    return captain;
}