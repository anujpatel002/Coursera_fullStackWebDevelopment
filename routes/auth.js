// Authentication routes combining Tasks 6 and 7
const express = require('express');
const router = express.Router();

// Import task-specific routes
const task6Routes = require('./task6_register_user');
const task7Routes = require('./task7_user_login');
const task8Routes = require('./task8_add_modify_review');
const task9Routes = require('./task9_delete_review');

// Use task routes
router.use('/', task6Routes);
router.use('/', task7Routes);
router.use('/', task8Routes);
router.use('/', task9Routes);

module.exports = router;