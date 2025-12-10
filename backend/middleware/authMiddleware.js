const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Token format: "Bearer <token>"
    const splitToken = token.split(' ')[1];
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    // Fetch full user from DB
    const user = await User.findById(decoded.userId).select('-password'); // exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });

    req.user = user; // attach full user object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
