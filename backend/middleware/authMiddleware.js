const jwt = require('jsonwebtoken');
const User = require('../models/User'); // make sure this path is correct

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Token format: "Bearer <token>"
    const splitToken = token.split(' ')[1];
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.userId).select('-password'); // exclude password
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    // Attach user object to request
    req.user = user; // now req.user.id, req.user.role, etc. are accessible
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};