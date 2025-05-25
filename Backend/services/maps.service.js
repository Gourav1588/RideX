const axios = require('axios');
const captainmodel = require('../db//models/captain.model');

// Helper function to calculate distance between two points in kilometers



module.exports.getAddressCoordinate = async (address) => {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    address: address,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            }
        );

        if (response.data.status !== 'OK') {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }

        // Defensive: always return both lat and lng as numbers
        const loc = response.data.results[0].geometry.location;
        return {
            lat: typeof loc.lat === 'number' ? loc.lat : Number(loc.lat),
            lng: typeof loc.lng === 'number' ? loc.lng : Number(loc.lng)
        };
    } catch (error) {
        console.error('Google Maps API call failed:', error.response?.data || error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    origin = origin.trim();
    destination = destination.trim();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Fix: use "origins" and "destinations" (plural)
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=driving&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    console.log('Generated Request URL:', url);

    try {
        console.log('Received origin:', origin);
        console.log('Received destination:', destination);

        const response = await axios.get(url);
        console.log('Google Maps API Response:', response.data);

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return element;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error('Error fetching distance and time:', err.message);
        throw err;
    }
};



module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input || typeof input !== 'string') {
        throw new Error('Valid query is required');
    }
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        throw new Error('API Key is missing');
    }
    
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    console.log('Request URL:', url);

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No suggestions found');
        } else if (response.data.status === 'OVER_QUERY_LIMIT') {
            throw new Error('Query limit exceeded');
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error('Error while fetching autocomplete suggestions:', err);
        throw new Error(`Error: ${err.response ? err.response.data.error_message : err.message}`);
    }
}
module.exports.getCaptainsInRadius = async (ltd, lng, radius = 3) => { // decreased default radius to 3km
    // Validate input to prevent null/undefined values
    if (typeof ltd !== 'number' || typeof lng !== 'number' || isNaN(ltd) || isNaN(lng)) {
        console.error('Invalid coordinates:', { ltd, lng });
        throw new Error('Latitude and longitude must be valid numbers');
    }
    if (typeof radius !== 'number' || isNaN(radius)) {
        console.error('Invalid radius:', radius);
        throw new Error('Radius must be a valid number');
    }

    console.log('Searching for captains near:', { latitude: ltd, longitude: lng, radius: radius });

    try {
        // First, check if we have any captains at all
        const totalCaptains = await captainmodel.countDocuments();
        console.log(`Total captains in database: ${totalCaptains}`);
        
        const activeCaptains = await captainmodel.countDocuments({ status: 'active' });
        console.log(`Active captains in database: ${activeCaptains}`);

        // Find all captains with valid locations first
        const query = {
            'location.type': 'Point',
            'location.coordinates': {
                $ne: [0, 0],
                $exists: true
            }
        };

        const nearbyQuery = {
            ...query,
            location: {
                $geoWithin: {
                    $centerSphere: [ [lng, ltd], radius / 6371 ]
                }
            }
        };

        console.log('MongoDB query:', JSON.stringify(nearbyQuery, null, 2));
        
        // Find all nearby captains first
        const allNearbyCaptains = await captainmodel.find(nearbyQuery);
        console.log(`Found ${allNearbyCaptains.length} total captains in ${radius}km radius`);
        
        // Filter active ones
        const activeCaptainsNearby = allNearbyCaptains.filter(c => c.status === 'active');
        console.log(`Of which ${activeCaptainsNearby.length} are active`);

        // If we found inactive captains nearby, log them to help debugging
        const inactiveCaptains = allNearbyCaptains.filter(c => c.status !== 'active');
        if (inactiveCaptains.length > 0) {
            console.log('Inactive captains found nearby:', inactiveCaptains.map(c => ({
                id: c._id,
                location: c.location,
                status: c.status
            })));
        }

        if (activeCaptainsNearby.length === 0 && radius < 6) { // changed max radius to 6km with smaller increments
            console.log('No active captains found, trying with larger radius...');
            return this.getCaptainsInRadius(ltd, lng, radius + 1.5); // increment by 1.5km instead of doubling
        }

        return activeCaptainsNearby;
    } catch (error) {
        console.error('Error in getCaptainsInRadius:', error);
        throw error;
    }
}
