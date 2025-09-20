// Task 12: Search by Author (2 Points)

const express = require('express');
const router = express.Router();
const { searchAuthorWithPromise, searchBooksByAuthorPromise } = require('../async_functions/async_functions');

/**
 * Task 12: Search by Author using Promises
 * Method: GET
 * Endpoint: /api/async/author/:author/promise
 * Points: 2
 * Description: Use Promises to search books by Author name
 * Authentication: Not required
 * Parameters: author - The author name to search for
 */
router.get('/author/:author/promise', searchAuthorWithPromise);

/**
 * Promise-based author search with additional processing
 * Method: GET
 * Endpoint: /api/async/author/:author/enhanced
 */
router.get('/author/:author/enhanced', (req, res) => {
  const author = req.params.author;
  
  searchBooksByAuthorPromise(author)
    .then(result => {
      // Add enhanced data processing
      if (result.success && result.books) {
        // Calculate additional statistics
        const totalReviews = result.books.reduce((sum, book) => sum + book.reviewCount, 0);
        const averageReviewsPerBook = result.count > 0 ? (totalReviews / result.count).toFixed(1) : 0;
        
        result.statistics = {
          totalBooks: result.count,
          totalReviews: totalReviews,
          averageReviewsPerBook: parseFloat(averageReviewsPerBook)
        };
      }
      
      result.enhancedSearch = true;
      result.processingTime = new Date().toISOString();
      
      const statusCode = result.success ? 200 : 404;
      res.status(statusCode).json(result);
    })
    .catch(error => {
      console.error('Enhanced Promise search error:', error);
      res.status(500).json({
        success: false,
        message: 'Enhanced author search failed',
        error: error.message,
        enhancedSearch: true
      });
    });
});

/**
 * Search multiple authors using Promise.allSettled
 * Method: POST
 * Endpoint: /api/async/authors/bulk
 * Body: { authors: ["author1", "author2", ...] }
 */
router.post('/authors/bulk', (req, res) => {
  const { authors } = req.body;
  
  if (!authors || !Array.isArray(authors)) {
    return res.status(400).json({
      success: false,
      message: 'Authors array is required in request body'
    });
  }

  // Use Promise.allSettled to handle all promises, even if some fail
  const searchPromises = authors.map(author => 
    searchBooksByAuthorPromise(author)
      .then(result => ({ status: 'fulfilled', value: result, author: author }))
      .catch(error => ({ status: 'rejected', reason: error.message, author: author }))
  );

  Promise.allSettled(searchPromises)
    .then(results => {
      const successfulSearches = results.filter(result => 
        result.value && result.value.status === 'fulfilled'
      );
      
      const failedSearches = results.filter(result => 
        result.value && result.value.status === 'rejected'
      );

      res.status(200).json({
        success: true,
        message: 'Bulk author search completed',
        totalSearches: authors.length,
        successfulSearches: successfulSearches.length,
        failedSearches: failedSearches.length,
        results: results,
        executionTime: new Date().toISOString()
      });
    })
    .catch(error => {
      console.error('Bulk search error:', error);
      res.status(500).json({
        success: false,
        message: 'Bulk author search failed',
        error: error.message
      });
    });
});

module.exports = router;