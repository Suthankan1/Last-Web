const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /api/books/add
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, language, price, image, description, googleDriveLink } = req.body;

    // Basic validation
    if (!title || !googleDriveLink) {
      return res.status(400).json({ error: 'Title and Google Drive link are required.' });
    }

    const newBook = new Book({
      title,
      author,
      category,
      language,
      price,
      image,
      description,
      googleDriveLink
    });

    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
