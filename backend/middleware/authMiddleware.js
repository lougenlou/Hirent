const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ensure path is correct

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'Authorization header missing' });
  }

  // Ensure format is "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Invalid authorization format' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and remove password
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    // Attach user object to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
