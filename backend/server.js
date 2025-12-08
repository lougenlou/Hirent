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
app.use('/api/auth', require('./routes/authRoutes')); //auth Routes
app.use('/api/users', require('./routes/userRoutes')); //user Routes
app.use('/api/items', require('./routes/itemsRoutes')); //item Routes
app.use("/api/wishlist", require("./routes/wishlistRoutes")); //wishlist Routes
app.use("/api/locations", require("./routes/locationRoutes")); //location Routes
app.use('/api/home', require('./routes/homeRoutes')); //home Routes
app.use('/api/cart', require('./routes/cartRoutes')); //cart Routes
app.use('/api/bookings', require('./routes/bookingRoutes')); //booking Routes
app.use('/api/calendar', require('./routes/calendarRoutes')); //calendar Routes
app.use('/api/earnings', require('./routes/earnings')); //earning routes
app.use('/api/payouts', require('./routes/payouts')); //payout routes

app.get('/', (req, res) => {
  res.send('API is running...');
});   

// ===== DATABASE & SERVER =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err.message));

// ===== ERROR HANDLER =====
app.use(errorHandler);
