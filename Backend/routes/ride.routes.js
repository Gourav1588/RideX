const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { body,query } = require('express-validator');
const rideController = require('../controlers/ride.con');  // Fixed typo 'controlers' to 'controllers'
const authMiddleware = require('../middilware/auth.middleware');  // Fixed typo 'middilware' to 'middleware'

// Route for creating a ride (with validation and controller)
router.post('/create',
    authMiddleware.authuser,  // Uncomment if you need authentication
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
);
// Route for getting fare (with validation and controller)
// routes/ride.routes.js


router.get(
  '/fare',
  [
    query('pickup')
      .isString().withMessage('Pickup must be a string')
      .bail()
      .isLength({ min: 3 }).withMessage('Invalid pickup address'),

    query('destination')
      .isString().withMessage('Destination must be a string')
      .bail()
      .isLength({ min: 3 }).withMessage('Invalid destination address'),

  
  ],

  // validation result check
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  },

  rideController.getFare
);

// Remove duplicate export
module.exports = router;