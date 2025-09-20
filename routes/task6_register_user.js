// Task 6: Register New user (3 Points)

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { users } = require('../data/books');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Task 6: Register new user
 * Method: POST
 * Endpoint: /api/auth/register
 * Points: 3
 * Description: Allow new users to register to the application
 * Authentication: Not required
 * Body: { username, password, email? }
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check if username already exists
    if (users[username]) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists. Please choose a different username.'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      password: hashedPassword,
      role: 'user',
      email: email || null,
      registeredAt: new Date().toISOString(),
      reviews: []
    };

    // Add user to users object (in real app, this would be saved to database)
    users[username] = newUser;

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { 
        username: username, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        username: username,
        role: newUser.role,
        email: newUser.email,
        registeredAt: newUser.registeredAt
      },
      token: token
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

/**
 * Check if username is available
 * Method: GET
 * Endpoint: /api/auth/check-username/:username
 */
router.get('/check-username/:username', (req, res) => {
  try {
    const { username } = req.params;

    if (users[username]) {
      res.status(200).json({
        success: true,
        available: false,
        message: 'Username is already taken'
      });
    } else {
      res.status(200).json({
        success: true,
        available: true,
        message: 'Username is available'
      });
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while checking username'
    });
  }
});

/**
 * Get registration statistics (for admin)
 * Method: GET
 * Endpoint: /api/auth/stats
 */
router.get('/stats', (req, res) => {
  try {
    const totalUsers = Object.keys(users).length;
    const adminUsers = Object.values(users).filter(user => user.role === 'admin').length;
    const regularUsers = totalUsers - adminUsers;

    res.status(200).json({
      success: true,
      message: 'Registration statistics retrieved',
      stats: {
        totalUsers: totalUsers,
        adminUsers: adminUsers,
        regularUsers: regularUsers,
        usernames: Object.keys(users)
      }
    });
  } catch (error) {
    console.error('Error retrieving registration stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving stats'
    });
  }
});

module.exports = router;