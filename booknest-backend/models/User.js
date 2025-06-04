const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Normalize to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true, // ⚠️ Stored as plain text (INSECURE)
  },
  user_type: {
    type: String,
    enum: ['user', 'admin'], // Accept only 'user' or 'admin'
    default: 'user',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// --- SECURITY WARNING ---
// This version stores passwords in plain text.
// DO NOT use this approach in production.
// To enable secure password hashing, use bcrypt as shown below:

/*
// Secure version (optional):
const bcrypt = require('bcrypt');

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
*/

// Export the User model
module.exports = mongoose.model('User', UserSchema);
