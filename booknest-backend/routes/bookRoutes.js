const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import the Book model
const authenticateToken = require('../middleware/authMiddleware'); // Protect routes

// 📚 Create a new book (admin only)
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { title, author, category, language, price, image, description, googleDriveLink } = req.body;

    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add books' });
    }

    const newBook = new Book({ title, author, category, language, price, image, description, googleDriveLink });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book', details: error.message });
  }
});

// 📚 Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// 📚 Get books by category
router.get('/category/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books by category' });
  }
});

// 📚 Edit a book (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'admin') {
    return res.status(403).json({ message: 'Only admins can edit books' });
  }

  try {
    const bookId = req.params.id;
    const updates = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book', details: error.message });
  }
});

// 📚 Delete a book (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete books' });
  }

  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book', details: error.message });
  }
});

// 📚 Search books by title, author, or category (public)
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const regex = new RegExp(query, 'i'); // Case-insensitive

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { category: regex },
      ],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search books', details: error.message });
  }
});

module.exports = router;
