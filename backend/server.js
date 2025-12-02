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
app.use(express.json());
app.use(passport.initialize());

// ====== ROUTES ======
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemsRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

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

