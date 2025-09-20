// Books routes combining Tasks 1-5
const express = require('express');
const router = express.Router();

// Import task-specific routes
const task2Routes = require('./task2_get_by_isbn');
const task3Routes = require('./task3_get_by_author');
const task4Routes = require('./task4_get_by_title');
const task5Routes = require('./task5_get_reviews');

// Import async function routes (Tasks 10-13)
const task10Routes = require('./task10_async_callback');
const task11Routes = require('./task11_promise_isbn');
const task12Routes = require('./task12_promise_author');
const task13Routes = require('./task13_async_title');

// Use task routes
router.use('/', task2Routes);
router.use('/', task3Routes);
router.use('/', task4Routes);
router.use('/', task5Routes);

// Async function routes with /async prefix
router.use('/async', task10Routes);
router.use('/async', task11Routes);
router.use('/async', task12Routes);
router.use('/async', task13Routes);

module.exports = router;