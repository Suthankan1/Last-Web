const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // bcrypt is no longer used for hashing/comparison

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is a mandatory field
    trim: true,     // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true,   // Ensures email addresses are unique across all users
    lowercase: true, // Stores email in lowercase to prevent case-sensitivity issues
    trim: true,     // Remove leading/trailing whitespace
  },
  password: {
    type: String,
    required: true, // Password is mandatory (will store plain text in this insecure version)
  },
  user_type: {
    type: String,
    enum: ['user', 'admin'], // Restricts user_type to either 'user' or 'admin'
    default: 'user',        // Default role for new users is 'user'
  },
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// --- REMOVED PASSWORD HASHING HOOK ---
// In this insecure version, we are not hashing passwords before saving.
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// --- REMOVED PASSWORD COMPARISON METHOD ---
// In this insecure version, password comparison happens directly in the controller.
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// Export the User model
module.exports = mongoose.model('User', UserSchema);
