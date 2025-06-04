// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');

// Middleware to normalize category to lowercase (helps with consistent matching)
function normalizeCategory(req, res, next) {
  if (req.params.category) {
    req.params.category = req.params.category.toLowerCase().trim();
  }
  next();
}

// @route   POST /api/books/add
// @desc    Add a new book (admin only)
router.post('/add', authenticateToken, bookController.addBook);

// @route   GET /api/books
// @desc    Get all books
router.get('/', bookController.getBooks);

// @route   GET /api/books/category/:category
// @desc    Get books by category (e.g., fiction, nonfiction, children)
router.get('/category/:category', normalizeCategory, bookController.getBooksByCategory);

// Optional future route to get a book by its ID
// router.get('/:id', bookController.getBookById);

module.exports = router;
