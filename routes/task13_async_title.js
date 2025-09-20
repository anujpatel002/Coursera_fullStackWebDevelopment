// Task 13: Search by Title (2 Points)

const express = require('express');
const router = express.Router();
const { searchTitleWithAsync, searchBooksByTitleAsync, getExternalBookDataAsync } = require('../async_functions/async_functions');

/**
 * Task 13: Search by Title using Async/Await
 * Method: GET
 * Endpoint: /api/async/title/:title/async
 * Points: 2
 * Description: Use async/await to search books by Title
 * Authentication: Not required
 * Parameters: title - The book title to search for
 */
router.get('/title/:title/async', searchTitleWithAsync);

/**
 * Advanced async/await with error handling and external data
 * Method: GET
 * Endpoint: /api/async/title/:title/advanced
 */
router.get('/title/:title/advanced', async (req, res) => {
  try {
    const title = req.params.title;
    const startTime = Date.now();
    
    // Search books by title
    const searchResult = await searchBooksByTitleAsync(title);
    
    // If books found, try to get additional external data for first book
    if (searchResult.success && searchResult.books && searchResult.books.length > 0) {
      try {
        const firstBook = searchResult.books[0];
        const externalData = await getExternalBookDataAsync(firstBook.isbn);
        
        searchResult.books[0].externalData = externalData.data;
        searchResult.enhancedWithExternalData = true;
      } catch (externalError) {
        console.warn('External data fetch failed:', externalError.message);
        searchResult.externalDataError = 'Could not fetch external data';
      }
    }
    
    const endTime = Date.now();
    searchResult.processingTime = `${endTime - startTime}ms`;
    searchResult.method = 'Advanced Async/Await';
    
    const statusCode = searchResult.success ? 200 : 404;
    res.status(statusCode).json(searchResult);
    
  } catch (error) {
    console.error('Advanced async search error:', error);
    res.status(500).json({
      success: false,
      message: 'Advanced title search failed',
      error: error.message,
      method: 'Advanced Async/Await'
    });
  }
});

/**
 * Parallel async operations using Promise.all with async/await
 * Method: GET
 * Endpoint: /api/async/titles/parallel
 * Query: ?titles=title1,title2,title3
 */
router.get('/titles/parallel', async (req, res) => {
  try {
    const { titles } = req.query;
    
    if (!titles) {
      return res.status(400).json({
        success: false,
        message: 'Titles query parameter is required (comma-separated)'
      });
    }
    
    const titleArray = titles.split(',').map(title => title.trim());
    const startTime = Date.now();
    
    // Parallel execution using Promise.all with async/await
    const searchPromises = titleArray.map(title => searchBooksByTitleAsync(title));
    const results = await Promise.all(searchPromises);
    
    const endTime = Date.now();
    const successfulSearches = results.filter(result => result.success);
    
    res.status(200).json({
      success: true,
      message: 'Parallel title search completed',
      method: 'Async/Await with Promise.all',
      totalSearches: titleArray.length,
      successfulSearches: successfulSearches.length,
      processingTime: `${endTime - startTime}ms`,
      searchedTitles: titleArray,
      results: results,
      executionTime: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Parallel async search error:', error);
    res.status(500).json({
      success: false,
      message: 'Parallel title search failed',
      error: error.message,
      method: 'Async/Await with Promise.all'
    });
  }
});

/**
 * Sequential async operations (await in loop)
 * Method: GET
 * Endpoint: /api/async/titles/sequential
 * Query: ?titles=title1,title2,title3
 */
router.get('/titles/sequential', async (req, res) => {
  try {
    const { titles } = req.query;
    
    if (!titles) {
      return res.status(400).json({
        success: false,
        message: 'Titles query parameter is required (comma-separated)'
      });
    }
    
    const titleArray = titles.split(',').map(title => title.trim());
    const startTime = Date.now();
    const results = [];
    
    // Sequential execution using await in loop
    for (const title of titleArray) {
      const result = await searchBooksByTitleAsync(title);
      results.push(result);
    }
    
    const endTime = Date.now();
    const successfulSearches = results.filter(result => result.success);
    
    res.status(200).json({
      success: true,
      message: 'Sequential title search completed',
      method: 'Async/Await Sequential (await in loop)',
      totalSearches: titleArray.length,
      successfulSearches: successfulSearches.length,
      processingTime: `${endTime - startTime}ms`,
      searchedTitles: titleArray,
      results: results,
      executionTime: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Sequential async search error:', error);
    res.status(500).json({
      success: false,
      message: 'Sequential title search failed',
      error: error.message,
      method: 'Async/Await Sequential'
    });
  }
});

module.exports = router;