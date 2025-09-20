// Task 3: Get all books by Author (2 Points)

const express = require('express');
const router = express.Router();
const { books } = require('../data/books');

/**
 * Task 3: Get all books by Author
 * Method: GET
 * Endpoint: /api/author/:author
 * Points: 2
 * Description: Search for specific books and retrieve their details based on author names
 * Authentication: Not required
 * Parameters: author - The author name to search for
 */
router.get('/author/:author', (req, res) => {
  try {
    const searchAuthor = req.params.author;
    
    // Search for books with matching author (case-insensitive)
    const matchingBooks = Object.entries(books).filter(([key, book]) => 
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
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
        message: `Found ${booksData.length} book(s) by author: ${searchAuthor}`,
        searchTerm: searchAuthor,
        count: booksData.length,
        books: booksData
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No books found by author: ${searchAuthor}`,
        searchTerm: searchAuthor,
        count: 0
      });
    }
  } catch (error) {
    console.error('Error searching books by author:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by author'
    });
  }
});

/**
 * Alternative endpoint with query parameter
 * Method: GET
 * Endpoint: /api/books/author?name=AuthorName
 */
router.get('/books/author', (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Author name parameter is required'
      });
    }

    // Search for books with matching author (case-insensitive)
    const matchingBooks = Object.entries(books).filter(([key, book]) => 
      book.author.toLowerCase().includes(name.toLowerCase())
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
        message: `Found ${booksData.length} book(s) by author: ${name}`,
        searchTerm: name,
        count: booksData.length,
        books: booksData
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No books found by author: ${name}`,
        searchTerm: name,
        count: 0
      });
    }
  } catch (error) {
    console.error('Error searching books by author:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while searching by author'
    });
  }
});

/**
 * Get all unique authors
 * Method: GET
 * Endpoint: /api/authors
 */
router.get('/authors', (req, res) => {
  try {
    const authors = [...new Set(Object.values(books).map(book => book.author))];
    
    res.status(200).json({
      success: true,
      message: 'All authors retrieved successfully',
      count: authors.length,
      authors: authors.sort()
    });
  } catch (error) {
    console.error('Error retrieving authors:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving authors'
    });
  }
});

module.exports = router;