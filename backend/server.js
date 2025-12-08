// server.js
const dotenv = require('dotenv');
dotenv.config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('./config/passport'); // Passport strategies
const initSentry = require('./utils/sentry');
const errorHandler = require('./middleware/errorHandler');
const parser = require('./utils/cloudinary');

// ====== EXPRESS APP ======
const app = express();

// ====== SENTRY ======
initSentry(app); // Must be before routes

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(passport.initialize());
app.post('/test-upload', parser.single('image'), (req, res) => {
  res.json({ url: req.file.path }); // Cloudinary URL of uploaded image
});

// Optional: handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// ====== ROUTES ======
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemsRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/earnings', require('./routes/earnings'));
app.use('/api/payouts', require('./routes/payouts'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Simple health check
app.get('/', (req, res) => res.send('API is running...'));

// ====== ERROR HANDLER ======
app.use(errorHandler); // After all routes

// ====== DATABASE & SERVER ======
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
