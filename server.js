const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./backend/middleware/errorHandler');
const passport = require("passport");
require("./backend/config/passport");

// Load environment variables
require ("dotenv").config();
const authRoutes = require('./backend/routes/authRoutes');

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
app.use('/api/auth', require('./backend/routes/authRoutes')); //auth Routes
app.use('/api/users', require('./backend/routes/userRoutes')); //user Routes
app.use('/api/items', require('./backend/routes/itemsRoutes')); //item Routes
app.use("/api/wishlist", require("./backend/routes/wishlistRoutes")); //wishlist Routes
app.use("/api/locations", require("./backend/routes/locationRoutes")); //location Routes
app.use('/api/home', require('./backend/routes/homeRoutes')); //home Routes
app.use('/api/cart', require('./backend/routes/cartRoutes')); //cart Routes
app.use('/api/bookings', require('./backend/routes/bookingRoutes')); //booking Routes
app.use('/api/calendar', require('./backend/routes/calendarRoutes')); //calendar Routes
app.use('/api/notifications', require('./backend/routes/notificationRoutes')); //notification Routes
app.use('/api/earnings', require('./backend/routes/earnings')); //earning routes
app.use('/api/payouts', require('./backend/routes/payouts')); //payout routes
app.use('/api/payments', require('./backend/routes/paymentRoutes')); //payment Routes


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
