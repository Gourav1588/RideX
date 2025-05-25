const rideService = require('../services/ride.service')
const {validationResult} = require('express-validator')
const mapService = require('../services/maps.service')


module.exports.createRide = async(req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      console.log ("here")
      return res.status(400).json({errors:errors.array()});
    }
    
    const {userId,pickup,destination,vehicleType}=req.body;
    try {
        // First get the coordinates for the pickup location
        const pickupCoordinate = await mapService.getAddressCoordinate(pickup);
        console.log('Pickup coordinates:', pickupCoordinate);

        // Create the ride
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        console.log('Ride created:', ride);
        res.status(201).json({
            success: true,
            data: ride
        });  
    } catch (err) {
        console.error('Error creating ride:', err);
        return res.status(500).json({message:err.message});
    }
}

// rideController.js
module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);

    return res.status(200).json({
      success: true,
      data: fare
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
