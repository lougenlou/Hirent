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
// This will catch malformed JSON before your routes run,
// and pass it to errorHandler properly.
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

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err.message));

// ====== ERROR HANDLING MIDDLEWARE ======
app.use(errorHandler); // ⬅ MUST be last

