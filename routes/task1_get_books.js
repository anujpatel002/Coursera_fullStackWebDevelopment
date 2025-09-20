// Task 1: Get the book list available in the shop (2 Points)
// General routes for public access (no authentication required)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');

/**
 * Root endpoint: Get all books (simple format for frontend compatibility)
 * Method: GET
 * Endpoint: /
 * Returns: Direct books object as expected by frontend
 */
router.get('/', (req, res) => {
  try {
    // Return books in the simple format expected by frontend
    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving books'
    });
  }
});

/**
 * Task 1: Get all books available in the shop
 * Method: GET
 * Endpoint: /books  
 * Points: 2
 * Description: Retrieve a list of all books available in the bookshop
 * Authentication: Not required
 */
router.get('/books', (req, res) => {
  try {
    // Return all books with their details
    const allBooks = Object.keys(books).map(key => ({
      id: key,
      isbn: books[key].isbn,
      author: books[key].author,
      title: books[key].title,
      reviewCount: Object.keys(books[key].reviews).length
    }));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      count: allBooks.length,
      books: allBooks
    });
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving books'
    });
  }
});

/**
 * Alternative endpoint to get complete book details
 * Method: GET
 * Endpoint: /api/books/details
 * Returns full book information including reviews
 */
router.get('/books/details', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Complete book details retrieved successfully',
      books: books
    });
  } catch (error) {
    console.error('Error retrieving book details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving book details'
    });
  }
});

module.exports = router;