// Task 4: Get all books based on Title (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');

/**
 * Task 4: Get all books based on Title
 * Method: GET
 * Endpoint: /api/title/:title
 * Points: 2
 * Description: Search for specific books and retrieve their details based on titles
 * Authentication: Not required
 * Parameters: title - The book title to search for
 */
router.get('/title/:title', (req, res) => {
  try {
    const searchTitle = req.params.title;
    
    // Search for books with matching title (case-insensitive partial match)
    const matchingBooks = Object.entries(books).filter(([key, book]) => 
      book.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    if (matchingBooks.length > 0) {
      const booksData = matchingBooks.map(([bookId, bookData]) => ({
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title,
        reviews: bookData.reviews,
        reviewCount: Object.keys(bookData.reviews).length
      }));

      res.status(200).json({
        success: true,
        message: `Found ${booksData.length} book(s) with title containing: ${searchTitle}`,
        searchTerm: searchTitle,
        count: booksData.length,
        books: booksData
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No books found with title containing: ${searchTitle}`,
        searchTerm: searchTitle,
        count: 0
      });
    }
  } catch (error) {
    console.error('Error searching books by title:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by title'
    });
  }
});

/**
 * Alternative endpoint with query parameter
 * Method: GET
 * Endpoint: /api/books/title?name=BookTitle
 */
router.get('/books/title', (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Title name parameter is required'
      });
    }

    // Search for books with matching title (case-insensitive partial match)
    const matchingBooks = Object.entries(books).filter(([key, book]) => 
      book.title.toLowerCase().includes(name.toLowerCase())
    );

    if (matchingBooks.length > 0) {
      const booksData = matchingBooks.map(([bookId, bookData]) => ({
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title,
        reviews: bookData.reviews,
        reviewCount: Object.keys(bookData.reviews).length
      }));

      res.status(200).json({
        success: true,
        message: `Found ${booksData.length} book(s) with title containing: ${name}`,
        searchTerm: name,
        count: booksData.length,
        books: booksData
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No books found with title containing: ${name}`,
        searchTerm: name,
        count: 0
      });
    }
  } catch (error) {
    console.error('Error searching books by title:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by title'
    });
  }
});

/**
 * Exact title match endpoint
 * Method: GET
 * Endpoint: /api/title/exact/:title
 */
router.get('/title/exact/:title', (req, res) => {
  try {
    const exactTitle = req.params.title;
    
    // Search for books with exact title match (case-insensitive)
    const matchingBooks = Object.entries(books).filter(([key, book]) => 
      book.title.toLowerCase() === exactTitle.toLowerCase()
    );

    if (matchingBooks.length > 0) {
      const booksData = matchingBooks.map(([bookId, bookData]) => ({
        id: bookId,
        isbn: bookData.isbn,
        author: bookData.author,
        title: bookData.title,
        reviews: bookData.reviews,
        reviewCount: Object.keys(bookData.reviews).length
      }));

      res.status(200).json({
        success: true,
        message: `Found exact match for title: ${exactTitle}`,
        searchTerm: exactTitle,
        count: booksData.length,
        books: booksData
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No exact match found for title: ${exactTitle}`,
        searchTerm: exactTitle,
        count: 0
      });
    }
  } catch (error) {
    console.error('Error searching books by exact title:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by exact title'
    });
  }
});

module.exports = router;