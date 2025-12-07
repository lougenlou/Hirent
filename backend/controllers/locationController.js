const Location = require('../models/Location');

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { name, description, lat, lng } = req.body;
    const location = new Location({
      name,
      description,
      coordinates: { type: 'Point', coordinates: [lng, lat] }
    });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search nearby locations within radius (in meters)
exports.getNearbyLocations = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // default 5km
    const locations = await Location.find({
      coordinates: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(radius) / 6378137 // radius in radians
          ]
        }
      }
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
