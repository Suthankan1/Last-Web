const mongoose = require('mongoose');

// Define the Book Schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: String,
  category: String,
  language: String,
  price: Number,
  image: String, // cover image URL
  description: String,
  googleDriveLink: {
    type: String,
    required: true, // Must have a Drive link to read the book
  },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Export the Book model
module.exports = mongoose.model('Book', BookSchema);
