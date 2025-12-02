const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler'); // ✅ Global error handler

// Load environment variables
dotenv.config();

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

// ====== ROUTES ======
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes (now includes validation)
app.use('/api/auth', require('./routes/auth'));

// Item search & filtering routes
app.use('/api/items', require('./routes/itemsRoutes'));

// Cart routes
app.use('/api/cart', require('./routes/cartRoutes'));

// Booking routes
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ⭐ GOOGLE CALENDAR SYNC ROUTES (NEW)
app.use('/api/calendar', require('./routes/calendarRoutes'));  // ⬅️ ADD THIS

// ====== ERROR HANDLING MIDDLEWARE ======
app.use(errorHandler); // ⬅ MUST be last

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
