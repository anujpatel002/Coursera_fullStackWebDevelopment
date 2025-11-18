// Task 11: Search by ISBN – Using Promises (2 Points)

const express = require('express');
const router = express.Router();
const { searchISBNWithPromise, searchBooksByISBNPromise } = require('../async_functions/async_functions');

/**
 * Task 11: Get all books using Promises
 * Method: GET
 * Endpoint: /api/async/books/promise
 * Points: 2
 * Description: Use Promises to get all books
 * Authentication: Not required
 */
router.get('/books/promise', (req, res) => {
  const { books } = require('../data/books');
  
  // Create a Promise to get all books
  const getAllBooksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const allBooks = Object.keys(books).map(key => ({
          id: key,
          isbn: books[key].isbn,
          author: books[key].author,
          title: books[key].title,
          reviewCount: Object.keys(books[key].reviews).length
        }));
        
        resolve({
          success: true,
          message: 'All books retrieved successfully using Promise',
          method: 'Promise',
          count: allBooks.length,
          books: allBooks
        });
      } catch (error) {
        reject(error);
      }
    }, 100);
  });
  
  getAllBooksPromise
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.error('Promise error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving books using Promise',
        error: error.message
      });
    });
});

/**
 * Task 11: Search by ISBN using Promises
 * Method: GET
 * Endpoint: /api/async/isbn/:isbn/promise
 * Points: 2
 * Description: Use Promises with Axios in Node.js to search books by ISBN
 * Authentication: Not required
 * Parameters: isbn - The ISBN code to search for
 */
router.get('/isbn/:isbn/promise', searchISBNWithPromise);

/**
 * Alternative Promise demonstration with .then() chaining
 * Method: GET
 * Endpoint: /api/async/isbn/:isbn/promise-chain
 */
router.get('/isbn/:isbn/promise-chain', (req, res) => {
  const isbn = req.params.isbn;
  
  // Demonstrate Promise chaining
  searchBooksByISBNPromise(isbn)
    .then(result => {
      // First .then() - add metadata
      return {
        ...result,
        metadata: {
          searchMethod: 'Promise with chaining',
          timestamp: new Date().toISOString(),
          promiseState: 'resolved'
        }
      };
    })
    .then(enrichedResult => {
      // Second .then() - format response
      const statusCode = enrichedResult.success ? 200 : 404;
      res.status(statusCode).json(enrichedResult);
    })
    .catch(error => {
      console.error('Promise chain error:', error);
      res.status(500).json({
        success: false,
        message: 'Promise chain failed during ISBN search',
        error: error.message,
        metadata: {
          searchMethod: 'Promise with chaining',
          timestamp: new Date().toISOString(),
          promiseState: 'rejected'
        }
      });
    });
});

/**
 * Multiple Promise handling (Promise.all demonstration)
 * Method: GET
 * Endpoint: /api/async/isbn/multiple/:isbn1/:isbn2
 */
router.get('/isbn/multiple/:isbn1/:isbn2', (req, res) => {
  const { isbn1, isbn2 } = req.params;
  
  // Search multiple ISBNs using Promise.all
  Promise.all([
    searchBooksByISBNPromise(isbn1),
    searchBooksByISBNPromise(isbn2)
  ])
    .then(results => {
      res.status(200).json({
        success: true,
        message: 'Multiple ISBN search completed using Promise.all',
        searchCount: 2,
        searchISBNs: [isbn1, isbn2],
        results: results,
        executionTime: new Date().toISOString()
      });
    })
    .catch(error => {
      console.error('Promise.all error:', error);
      res.status(500).json({
        success: false,
        message: 'Multiple ISBN search failed',
        error: error.message
      });
    });
});

module.exports = router;