// Task 10: Get all books – Using async callback function (2 Points)
// This file contains async functions using callbacks, promises, and async/await as required by Tasks 10-13

const axios = require('axios');
const { books } = require('../data/books');

/**
 * Task 10: Get all books using async callback function
 * Points: 2
 * Description: Use async callback function to retrieve all books
 */

// Callback-based async function to get all books
function getAllBooksCallback(callback) {
  // Simulate async operation with setTimeout
  setTimeout(() => {
    try {
      const allBooks = Object.keys(books).map(key => ({
        id: key,
        isbn: books[key].isbn,
        author: books[key].author,
        title: books[key].title,
        reviewCount: Object.keys(books[key].reviews).length
      }));

      // Call callback with success (error = null, result = data)
      callback(null, {
        success: true,
        message: 'All books retrieved successfully using callback',
        count: allBooks.length,
        books: allBooks
      });
    } catch (error) {
      // Call callback with error
      callback(error, null);
    }
  }, 100); // 100ms delay to simulate async behavior
}

// Wrapper function that uses callback and returns via Express response
function getAllBooksWithCallback(req, res) {
  getAllBooksCallback((error, result) => {
    if (error) {
      console.error('Callback error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving books using callback',
        error: error.message
      });
    }

    res.status(200).json(result);
  });
}

/**
 * Task 11: Search by ISBN using Promises
 * Points: 2
 * Description: Use Promises with Axios to search books by ISBN
 */

// Promise-based function using axios to simulate API call
function searchBooksByISBNPromise(isbn) {
  return new Promise((resolve, reject) => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const bookEntry = Object.entries(books).find(([key, book]) => 
          book.isbn === isbn
        );

        if (bookEntry) {
          const [bookId, bookData] = bookEntry;
          resolve({
            success: true,
            message: `Book found with ISBN: ${isbn} using Promise`,
            method: 'Promise',
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
          resolve({
            success: false,
            message: `No book found with ISBN: ${isbn} using Promise`,
            method: 'Promise',
            isbn: isbn
          });
        }
      } catch (error) {
        reject(error);
      }
    }, 200); // 200ms delay
  });
}

// Using Promise with .then() and .catch()
function searchISBNWithPromise(req, res) {
  const isbn = req.params.isbn;
  
  searchBooksByISBNPromise(isbn)
    .then(result => {
      const statusCode = result.success ? 200 : 404;
      res.status(statusCode).json(result);
    })
    .catch(error => {
      console.error('Promise error:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching books by ISBN using Promise',
        error: error.message
      });
    });
}

/**
 * Task 12: Search by Author using Promises
 * Points: 2
 * Description: Use Promises to search books by Author
 */

function searchBooksByAuthorPromise(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const matchingBooks = Object.entries(books).filter(([key, book]) => 
          book.author.toLowerCase().includes(author.toLowerCase())
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

          resolve({
            success: true,
            message: `Found ${booksData.length} book(s) by author: ${author} using Promise`,
            method: 'Promise',
            searchTerm: author,
            count: booksData.length,
            books: booksData
          });
        } else {
          resolve({
            success: false,
            message: `No books found by author: ${author} using Promise`,
            method: 'Promise',
            searchTerm: author,
            count: 0
          });
        }
      } catch (error) {
        reject(error);
      }
    }, 150);
  });
}

function searchAuthorWithPromise(req, res) {
  const author = req.params.author;
  
  searchBooksByAuthorPromise(author)
    .then(result => {
      const statusCode = result.success ? 200 : 404;
      res.status(statusCode).json(result);
    })
    .catch(error => {
      console.error('Promise error:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching books by author using Promise',
        error: error.message
      });
    });
}

/**
 * Task 13: Search by Title using Async/Await
 * Points: 2
 * Description: Use async/await to search books by Title
 */

// Async function using async/await
async function searchBooksByTitleAsync(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const matchingBooks = Object.entries(books).filter(([key, book]) => 
          book.title.toLowerCase().includes(title.toLowerCase())
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

          resolve({
            success: true,
            message: `Found ${booksData.length} book(s) with title containing: ${title} using Async/Await`,
            method: 'Async/Await',
            searchTerm: title,
            count: booksData.length,
            books: booksData
          });
        } else {
          resolve({
            success: false,
            message: `No books found with title containing: ${title} using Async/Await`,
            method: 'Async/Await',
            searchTerm: title,
            count: 0
          });
        }
      } catch (error) {
        reject(error);
      }
    }, 180);
  });
}

async function searchTitleWithAsync(req, res) {
  try {
    const title = req.params.title;
    const result = await searchBooksByTitleAsync(title);
    const statusCode = result.success ? 200 : 404;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error('Async/Await error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching books by title using Async/Await',
      error: error.message
    });
  }
}

// Simulate external API call using Axios (for demonstration)
async function getExternalBookDataAsync(isbn) {
  try {
    // In a real scenario, this would call an external API
    // For demonstration, we'll simulate with a local promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            isbn: isbn,
            external_source: 'Simulated External API',
            timestamp: new Date().toISOString()
          }
        });
      }, 100);
    });
  } catch (error) {
    throw new Error('Failed to fetch external book data');
  }
}

module.exports = {
  getAllBooksWithCallback,
  searchISBNWithPromise,
  searchAuthorWithPromise,
  searchTitleWithAsync,
  getAllBooksCallback,
  searchBooksByISBNPromise,
  searchBooksByAuthorPromise,
  searchBooksByTitleAsync,
  getExternalBookDataAsync
};