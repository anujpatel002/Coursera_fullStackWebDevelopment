// Task 8: Add/Modify a book review (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');
const { isAuthenticated, authenticateJWT, canModifyReview } = require('../middleware/auth');

/**
 * Task 8: Add/Modify a book review
 * Method: PUT (for modify) / POST (for add)
 * Endpoint: /api/auth/review/:isbn
 * Points: 2
 * Description: Allow logged-in users to add a new review or modify their existing review for a book
 * Authentication: Required (session or JWT)
 * Parameters: isbn - The ISBN of the book to review
 * Body: { rating, comment }
 */

// Add or modify review using session authentication
router.put('/auth/review/:isbn', isAuthenticated, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const { rating, comment } = req.body;
    const username = req.session.user.username;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be an integer between 1 and 5'
      });
    }

    // Find book by ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === isbn
    );

    if (!bookEntry) {
      return res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${isbn}`
      });
    }

    const [bookId, bookData] = bookEntry;
    const isModifying = bookData.reviews[username] ? true : false;

    // Add or update the review
    bookData.reviews[username] = {
      rating: rating,
      comment: comment,
      reviewedAt: new Date().toISOString()
    };

    const action = isModifying ? 'modified' : 'added';
    
    res.status(200).json({
      success: true,
      message: `Review ${action} successfully`,
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      review: {
        username: username,
        rating: rating,
        comment: comment,
        reviewedAt: bookData.reviews[username].reviewedAt
      },
      action: action
    });

  } catch (error) {
    console.error('Error adding/modifying review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing review'
    });
  }
});

// Add review using JWT authentication (alternative endpoint)
router.post('/auth/review/:isbn', authenticateJWT, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const { rating, comment } = req.body;
    const username = req.user.username;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be an integer between 1 and 5'
      });
    }

    // Find book by ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === isbn
    );

    if (!bookEntry) {
      return res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${isbn}`
      });
    }

    const [bookId, bookData] = bookEntry;
    const isModifying = bookData.reviews[username] ? true : false;

    // Check if user is trying to add a review when they already have one
    if (isModifying) {
      return res.status(409).json({
        success: false,
        message: 'You already have a review for this book. Use PUT method to modify it.',
        existingReview: bookData.reviews[username]
      });
    }

    // Add the review
    bookData.reviews[username] = {
      rating: rating,
      comment: comment,
      reviewedAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      review: {
        username: username,
        rating: rating,
        comment: comment,
        reviewedAt: bookData.reviews[username].reviewedAt
      }
    });

  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while adding review'
    });
  }
});

/**
 * Get user's own reviews
 * Method: GET
 * Endpoint: /api/auth/my-reviews
 */
router.get('/auth/my-reviews', isAuthenticated, (req, res) => {
  try {
    const username = req.session.user.username;
    const userReviews = [];

    // Find all reviews by this user
    Object.entries(books).forEach(([bookId, bookData]) => {
      if (bookData.reviews[username]) {
        userReviews.push({
          bookId: bookId,
          isbn: bookData.isbn,
          author: bookData.author,
          title: bookData.title,
          review: bookData.reviews[username]
        });
      }
    });

    res.status(200).json({
      success: true,
      message: `Found ${userReviews.length} reviews by user: ${username}`,
      username: username,
      reviewCount: userReviews.length,
      reviews: userReviews
    });

  } catch (error) {
    console.error('Error retrieving user reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving user reviews'
    });
  }
});

module.exports = router;