// Task 10: Get all books – Using async callback function (2 Points)

const express = require('express');
const router = express.Router();
const { getAllBooksWithCallback } = require('../async_functions/async_functions');

/**
 * Task 10: Get all books using async callback function
 * Method: GET
 * Endpoint: /api/async/books/callback
 * Points: 2
 * Description: Use async callback function to retrieve all books
 * Authentication: Not required
 */
router.get('/books/callback', getAllBooksWithCallback);

/**
 * Alternative endpoint for testing callback functionality
 * Method: GET
 * Endpoint: /api/async/callback-test
 */
router.get('/callback-test', (req, res) => {
  const { getAllBooksCallback } = require('../async_functions/async_functions');
  
  // Demonstrate callback usage
  getAllBooksCallback((error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Callback test failed',
        error: error.message,
        testType: 'Async Callback Function Test'
      });
    }

    res.status(200).json({
      ...result,
      testType: 'Async Callback Function Test',
      executionTime: new Date().toISOString()
    });
  });
});

module.exports = router;