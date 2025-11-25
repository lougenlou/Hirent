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

// ====== DATABASE CONNECTION ======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes')); // User routes

const homepageRoutes = require("./api/homepage/homepage.route");
app.use("/api/homepage", homepageRoutes);

// ====== ROUTES ======
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Item search & filtering routes (NEW)
app.use('/api/items', require('./routes/itemsRoutes'));

// ====== ERROR HANDLING MIDDLEWARE ======
app.use(errorHandler); // catches thrown or unhandled errors

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
