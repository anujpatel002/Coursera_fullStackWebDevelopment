// Task 2: Get the books based on ISBN (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');

/**
 * Task 2: Get books based on ISBN
 * Method: GET
 * Endpoint: /api/isbn/:isbn
 * Points: 2
 * Description: Search for specific books and retrieve their details based on the book's ISBN code
 * Authentication: Not required
 * Parameters: isbn - The ISBN code of the book
 */
router.get('/isbn/:isbn', (req, res) => {
  try {
    const searchISBN = req.params.isbn;
    
    // Search for book with matching ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === searchISBN
    );

    if (bookEntry) {
      const [bookId, bookData] = bookEntry;
      
      res.status(200).json({
        success: true,
        message: `Book found with ISBN: ${searchISBN}`,
        book: {
          id: bookId,
          isbn: bookData.isbn,
          author: bookData.author,
          title: bookData.title,
          reviews: bookData.reviews,
          reviewCount: Object.keys(bookData.reviews).length
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${searchISBN}`,
        isbn: searchISBN
      });
    }
  } catch (error) {
    console.error('Error searching book by ISBN:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by ISBN'
    });
  }
});

/**
 * Alternative endpoint with query parameter
 * Method: GET
 * Endpoint: /api/books/search?isbn=xxx
 */
router.get('/books/search', (req, res) => {
  try {
    const { isbn } = req.query;
    
    if (!isbn) {
      return res.status(400).json({
        success: false,
        message: 'ISBN parameter is required'
      });
    }

    // Search for book with matching ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === isbn
    );

    if (bookEntry) {
      const [bookId, bookData] = bookEntry;
      
      res.status(200).json({
        success: true,
        message: `Book found with ISBN: ${isbn}`,
        book: {
          id: bookId,
          isbn: bookData.isbn,
          author: bookData.author,
          title: bookData.title,
          reviews: bookData.reviews,
          reviewCount: Object.keys(bookData.reviews).length
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${isbn}`,
        isbn: isbn
      });
    }
  } catch (error) {
    console.error('Error searching book by ISBN:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by ISBN'
    });
  }
});

module.exports = router;