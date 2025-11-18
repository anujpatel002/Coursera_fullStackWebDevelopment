// Task 9: Delete book review added by that particular user (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');
const { isAuthenticated, authenticateJWT, canModifyReview } = require('../middleware/auth');

/**
 * Task 9: Delete book review
 * Method: DELETE
 * Endpoint: /api/auth/review/:isbn/:username
 * Points: 2
 * Description: Allow logged-in users to delete their own book reviews only
 * Authentication: Required (session or JWT)
 * Parameters: isbn - The ISBN of the book, username - The username (must match logged-in user)
 */

// Delete review using session authentication
router.delete('/auth/review/:isbn/:username', isAuthenticated, canModifyReview, (req, res) => {
  try {
    const { isbn, username } = req.params;
    const currentUser = req.session.user.username;

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

    // Check if review exists
    if (!bookData.reviews[username]) {
      return res.status(404).json({
        success: false,
        message: `No review found for user ${username} on book with ISBN: ${isbn}`
      });
    }

    // Store review data before deletion for response
    const deletedReview = {
      username: username,
      rating: bookData.reviews[username].rating,
      comment: bookData.reviews[username].comment,
      reviewedAt: bookData.reviews[username].reviewedAt
    };

    // Delete the review
    delete bookData.reviews[username];

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      deletedReview: deletedReview,
      remainingReviews: Object.keys(bookData.reviews).length
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting review'
    });
  }
});

// Alternative endpoint - delete own review using ISBN only
router.delete('/auth/review/:isbn', isAuthenticated, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const username = req.session.user.username;

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

    // Check if user has a review for this book
    if (!bookData.reviews[username]) {
      return res.status(404).json({
        success: false,
        message: `No review found for your account on book with ISBN: ${isbn}`
      });
    }

    // Store review data before deletion for response
    const deletedReview = {
      username: username,
      rating: bookData.reviews[username].rating,
      comment: bookData.reviews[username].comment,
      reviewedAt: bookData.reviews[username].reviewedAt
    };

    // Delete the review
    delete bookData.reviews[username];

    res.status(200).json({
      success: true,
      message: 'Your review deleted successfully',
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      deletedReview: deletedReview,
      remainingReviews: Object.keys(bookData.reviews).length
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting review'
    });
  }
});

// Delete review using JWT authentication
router.delete('/auth/jwt/review/:isbn', authenticateJWT, (req, res) => {
  try {
    const isbn = req.params.isbn;
    const username = req.user.username;

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

    // Check if user has a review for this book
    if (!bookData.reviews[username]) {
      return res.status(404).json({
        success: false,
        message: `No review found for your account on book with ISBN: ${isbn}`
      });
    }

    // Store review data before deletion for response
    const deletedReview = {
      username: username,
      rating: bookData.reviews[username].rating,
      comment: bookData.reviews[username].comment,
      reviewedAt: bookData.reviews[username].reviewedAt
    };

    // Delete the review
    delete bookData.reviews[username];

    res.status(200).json({
      success: true,
      message: 'Your review deleted successfully',
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      deletedReview: deletedReview,
      remainingReviews: Object.keys(bookData.reviews).length
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting review'
    });
  }
});

/**
 * Bulk delete all reviews by current user
 * Method: DELETE
 * Endpoint: /api/auth/reviews/all
 */
router.delete('/auth/reviews/all', isAuthenticated, (req, res) => {
  try {
    const username = req.session.user.username;
    let deletedCount = 0;
    const deletedReviews = [];

    // Find and delete all reviews by this user
    Object.entries(books).forEach(([bookId, bookData]) => {
      if (bookData.reviews[username]) {
        deletedReviews.push({
          bookId: bookId,
          isbn: bookData.isbn,
          title: bookData.title,
          deletedReview: bookData.reviews[username]
        });
        delete bookData.reviews[username];
        deletedCount++;
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found to delete for your account'
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${deletedCount} review(s)`,
      username: username,
      deletedCount: deletedCount,
      deletedReviews: deletedReviews
    });

  } catch (error) {
    console.error('Error bulk deleting reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while bulk deleting reviews'
    });
  }
});

module.exports = router;