// General routes that include Task 1 and other public endpoints
const express = require('express');
const router = express.Router();

// Import Task 1 routes
const task1Routes = require('./task1_get_books');
const task2Routes = require('./task2_get_by_isbn');
const task3Routes = require('./task3_get_by_author');
const task4Routes = require('./task4_get_by_title');
const task5Routes = require('./task5_get_reviews');

// Use Task routes for public access
router.use('/', task1Routes);
router.use('/', task2Routes);
router.use('/', task3Routes);
router.use('/', task4Routes);
router.use('/', task5Routes);

module.exports = router;