// Task 7: Login as a Registered user (3 Points)

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { users } = require('../data/books');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Task 7: Login as a registered user
 * Method: POST
 * Endpoint: /api/auth/login
 * Points: 3
 * Description: Allow registered users to login to the application with session and JWT authentication
 * Authentication: Not required for this endpoint
 * Body: { username, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check if user exists
    const user = users[username];
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Create session
    req.session.user = {
      username: username,
      role: user.role,
      loginTime: new Date().toISOString()
    };

    // Generate JWT token
    const token = jwt.sign(
      { 
        username: username, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login time (in real app, this would be in database)
    user.lastLogin = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        username: username,
        role: user.role,
        lastLogin: user.lastLogin
      },
      token: token,
      sessionId: req.sessionID
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

/**
 * Logout endpoint
 * Method: POST
 * Endpoint: /api/auth/logout
 */
router.post('/logout', (req, res) => {
  try {
    if (req.session) {
      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({
            success: false,
            message: 'Error during logout'
          });
        }

        // Clear session cookie
        res.clearCookie('connect.sid');
        
        res.status(200).json({
          success: true,
          message: 'Logout successful'
        });
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Already logged out'
      });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
});

/**
 * Get current session/user info
 * Method: GET
 * Endpoint: /api/auth/me
 */
router.get('/me', (req, res) => {
  try {
    if (req.session && req.session.user) {
      res.status(200).json({
        success: true,
        message: 'User session active',
        user: req.session.user,
        sessionId: req.sessionID
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'No active session'
      });
    }
  } catch (error) {
    console.error('Error getting session info:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while getting session info'
    });
  }
});

/**
 * Verify JWT token
 * Method: POST
 * Endpoint: /api/auth/verify-token
 */
router.post('/verify-token', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      decoded: decoded
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else {
      console.error('Error verifying token:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while verifying token'
      });
    }
  }
});

module.exports = router;