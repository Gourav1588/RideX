const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    if (!address || typeof address !== 'string') {
        return res.status(400).json({ message: "Valid address is required" });
    }

    try {
        console.log('Using API key:', process.env.GOOGLE_MAPS_API_KEY);
        const coordinates = await mapService.getAddressCoordinate(address.trim());
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error in getCoordinates:', error.message);
        res.status(500).json({
            message: "Failed to fetch coordinates",
            error: error.message
        });
    }
};

const getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    if (
        !origin || !destination ||
        typeof origin !== 'string' ||
        typeof destination !== 'string'
    ) {
        return res.status(400).json({ message: "Valid origin and destination are required" });
    }

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error('Error in getDistanceTime:', err.message);
        res.status(500).json({ message: 'Failed to fetch distance and time', error: err.message });
    }
};

const getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        console.log('Received input:', input); // Log input here

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions
};
