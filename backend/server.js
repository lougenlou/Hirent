require("./instrument.js"); // Sentry auto-instrumentation
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");

const errorHandler = require('./middleware/errorHandler');
require("./config/passport");

// ----- INIT APP -----
const app = express();

// manual Sentry init for extra control
const initSentry = require("./utils/sentry");
initSentry(app);

// ----- MIDDLEWARE -----
app.use(cors());
app.use(express.json()); // Parse JSON

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return next({
      statusCode: 400,
      message: 'Invalid JSON format',
    });
  }
  next();
});

app.use(passport.initialize());

// ----- ROUTES -----
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemsRoutes'));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/locations", require("./routes/locationRoutes"));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/earnings', require('./routes/earnings'));
app.use('/api/payouts', require('./routes/payouts'));
app.use('/api/payments', require('./routes/paymentRoutes'));

app.get('/', (req, res) => res.send('API is running...'));

// ----- DATABASE & SERVER -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err.message));

// ----- ERROR HANDLING -----
app.use(errorHandler);

// Sentry error handler
const Sentry = require("@sentry/node");
app.use(Sentry.Handlers.errorHandler());
