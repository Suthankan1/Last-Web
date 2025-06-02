const User = require('../models/User');
// const bcrypt = require('bcrypt'); // bcrypt is no longer used for hashing/comparison
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Password validation function (still kept for client-side validation, though not for hashing)
function validatePassword(password) {
  // Password must be at least 6 characters long and contain at least one letter and one number.
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
}

// Signup controller (INSECURE - saves plain text password)
exports.signup = async (req, res) => {
  const { name, email, password, user_type } = req.body;

  // Basic validation for required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  // Normalize email to lowercase to ensure consistency in database storage and lookup
  const emailLower = email.toLowerCase();

  // Client-side password validation (still applies, but not for hashing)
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 6 characters long and contain at least one letter and one number.',
    });
  }

  try {
    // Check if a user with the normalized email already exists
    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // --- INSECURE: Saving plain-text password directly ---
    // NO HASHING HERE. The password will be stored as is.
    console.log("WARNING: Saving plain-text password (INSECURE):", password);

    // Create a new user instance with the plain-text password
    const newUser = new User({
      name,
      email: emailLower,
      password: password, // Storing plain-text password
      // Assign user_type, defaulting to 'user' if not provided
      user_type: user_type || 'user',
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // Log detailed error for server-side debugging
    console.error('Signup error:', err);
    // Send a generic error message to the client
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};


// Login controller (INSECURE - compares plain text passwords)
exports.login = async (req, res) => {
  let { email, password } = req.body;

  // Basic validation for required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Normalize email to lowercase for consistent lookup
  email = email.toLowerCase();

  try {
    // Find the user by normalized email
    const user = await User.findOne({ email });
    if (!user) {
      // Log if no user is found for the given email
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // --- ENHANCED LOGGING FOR DEBUGGING ---
    console.log(`Login attempt for email: ${email}`);
    console.log(`Received plain-text password: ${password}`);
    console.log(`Stored plain-text password (from DB): ${user.password}`);
    // --- END ENHANCED LOGGING ---

    // --- INSECURE: Directly comparing plain-text passwords ---
    const isMatch = (password === user.password); // Direct comparison
    console.log(`Password match for ${email}:`, isMatch); // Will be true or false

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials match, generate a JSON Web Token (JWT)
    // The JWT_SECRET must be securely stored in your .env file
    const token = jwt.sign(
      { id: user._id, name: user.name, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send successful login response with token and user details
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
      },
    });
  } catch (err) {
    // Log detailed error for server-side debugging
    console.error('Login error:', err);
    // Send a generic error message to the client
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
