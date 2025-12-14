// middleware/firebaseAuth.js
const admin = require('../config/firebaseAdmin');

const firebaseAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error.message);
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = firebaseAuth;
