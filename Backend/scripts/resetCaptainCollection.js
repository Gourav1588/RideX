const mongoose = require('mongoose');
require('dotenv').config();

async function resetCaptainCollection() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Drop the existing collection
        await mongoose.connection.collection('captains').drop();
        console.log('Dropped captains collection');

        // Create new collection with schema
        const CaptainModel = require('../db/models/captain.model');
        await CaptainModel.createCollection();
        console.log('Created new captains collection with updated schema');

        // Create 2dsphere index
        await CaptainModel.collection.createIndex({ location: '2dsphere' });
        console.log('Created 2dsphere index on location field');

        console.log('Successfully reset captains collection');
    } catch (error) {
        console.error('Error resetting collection:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }
}

resetCaptainCollection(); 