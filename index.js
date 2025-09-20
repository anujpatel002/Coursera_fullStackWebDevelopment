// Main server file for the Bookstore API
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'bookstore-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Import route handlers
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

// Import async functions for Node.js methods
const asyncFunctions = require('./async_functions/async_functions');

// API routes (mounted before static files to take precedence)
app.use('/', generalRoutes);        // Tasks 1-5 public endpoints
app.use('/customer', authRoutes);   // Tasks 6-7 authentication endpoints  
app.use('/customer', booksRoutes);  // Tasks 8-9 protected endpoints

// Serve static files from public directory (after API routes)
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Bookstore API server running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}`);
});

module.exports = app;