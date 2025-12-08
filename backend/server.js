const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const passport = require("passport");
require("./config/passport");

// Load environment variables
require ("dotenv").config();
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ⭐ OPTIONAL BUT HIGHLY RECOMMENDED
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return next({
      statusCode: 400,
      message: 'Invalid JSON format',
    });
  }
  next();
});

// ====== DATABASE CONNECTION ======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));
app.use(express.json());
app.use(passport.initialize());

// ====== ROUTES ======
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemsRoutes'));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/locations", require("./routes/locationRoutes"));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes (now includes validation)
app.use('/api/auth', require('./routes/auth'));
// ====== ERROR HANDLING MIDDLEWARE ======
app.use(errorHandler);

// ====== DATABASE CONNECTION + START SERVER ======
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

// Booking routes
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ⭐ GOOGLE CALENDAR SYNC ROUTES (NEW)
app.use('/api/calendar', require('./routes/calendarRoutes'));  // ⬅️ ADD THIS

// ====== ERROR HANDLING MIDDLEWARE ======
app.use(errorHandler); // ⬅ MUST be last

