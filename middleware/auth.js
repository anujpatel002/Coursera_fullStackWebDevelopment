// Middleware for authentication and authorization
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'bookstore-jwt-secret';

// Check if user is authenticated via session
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ error: 'Authentication required. Please login.' });
  }
};

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Check if user can modify/delete review (only their own)
const canModifyReview = (req, res, next) => {
  const { isbn, username } = req.params;
  const currentUser = req.session.user || req.user.username;
  
  if (currentUser !== username) {
    return res.status(403).json({ 
      error: 'Access denied. You can only modify your own reviews.' 
    });
  }
  
  next();
};

module.exports = {
  isAuthenticated,
  authenticateJWT,
  canModifyReview,
  JWT_SECRET
};