const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    // [longitude, latitude]
    coordinates: { type: [Number], required: true }
  }
});

// Create 2dsphere index for geospatial queries
LocationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', LocationSchema);
