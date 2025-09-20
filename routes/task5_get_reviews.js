// Task 5: Get book Review (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');

/**
 * Task 5: Get book reviews
 * Method: GET
 * Endpoint: /api/review/:isbn
 * Points: 2
 * Description: Retrieve reviews/comments for specified books
 * Authentication: Not required
 * Parameters: isbn - The ISBN of the book to get reviews for
 */
router.get('/review/:isbn', (req, res) => {
  try {
    const searchISBN = req.params.isbn;
    
    // Find book by ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === searchISBN
    );

    if (bookEntry) {
      const [bookId, bookData] = bookEntry;
      const reviews = bookData.reviews;
      const reviewCount = Object.keys(reviews).length;

      // Calculate average rating if reviews exist
      let averageRating = 0;
      if (reviewCount > 0) {
        const totalRating = Object.values(reviews).reduce((sum, review) => sum + review.rating, 0);
        averageRating = (totalRating / reviewCount).toFixed(1);
      }

      res.status(200).json({
        success: true,
        message: `Reviews retrieved for book with ISBN: ${searchISBN}`,
        book: {
          id: bookId,
          isbn: bookData.isbn,
          author: bookData.author,
          title: bookData.title
        },
        reviewCount: reviewCount,
        averageRating: parseFloat(averageRating),
        reviews: reviews
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${searchISBN}`,
        isbn: searchISBN
      });
    }
  } catch (error) {
    console.error('Error retrieving book reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving reviews'
    });
  }
});

/**
 * Get reviews by book ID
 * Method: GET
 * Endpoint: /api/books/:id/reviews
 */
router.get('/books/:id/reviews', (req, res) => {
  try {
    const bookId = req.params.id;
    
    if (!books[bookId]) {
      return res.status(404).json({
        success: false,
        message: `No book found with ID: ${bookId}`,
        bookId: bookId
      });
    }

    const bookData = books[bookId];
    const reviews = bookData.reviews;
    const reviewCount = Object.keys(reviews).length;

    // Calculate average rating if reviews exist
    let averageRating = 0;
    if (reviewCount > 0) {
      const totalRating = Object.values(reviews).reduce((sum, review) => sum + review.rating, 0);
      averageRating = (totalRating / reviewCount).toFixed(1);
    }

    res.status(200).json({
      success: true,
      message: `Reviews retrieved for book ID: ${bookId}`,
      book: {
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title
      },
      reviewCount: reviewCount,
      averageRating: parseFloat(averageRating),
      reviews: reviews
    });
  } catch (error) {
    console.error('Error retrieving book reviews by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving reviews'
    });
  }
});

/**
 * Get specific user's review for a book
 * Method: GET
 * Endpoint: /api/review/:isbn/user/:username
 */
router.get('/review/:isbn/user/:username', (req, res) => {
  try {
    const { isbn, username } = req.params;
    
    // Find book by ISBN
    const bookEntry = Object.entries(books).find(([key, book]) => 
      book.isbn === isbn
    );

    if (!bookEntry) {
      return res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${isbn}`,
        isbn: isbn
      });
    }

    const [bookId, bookData] = bookEntry;
    const userReview = bookData.reviews[username];

    if (userReview) {
      res.status(200).json({
        success: true,
        message: `Review found for user ${username} on book with ISBN: ${isbn}`,
        book: {
          id: bookId,
          isbn: bookData.isbn,
          author: bookData.author,
          title: bookData.title
        },
        review: {
          username: username,
          rating: userReview.rating,
          comment: userReview.comment
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No review found for user ${username} on book with ISBN: ${isbn}`,
        isbn: isbn,
        username: username
      });
    }
  } catch (error) {
    console.error('Error retrieving user review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving user review'
    });
  }
});

module.exports = router;