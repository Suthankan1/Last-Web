const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Password validation function
function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
}

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password, user_type } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  // Normalize email to lowercase
  const emailLower = email.toLowerCase();

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 6 characters long and contain at least one letter and one number.',
    });
  }

  try {
    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: emailLower,
      password: hashedPassword,
      user_type: user_type || 'user',
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};


// Login controller
exports.login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  email = email.toLowerCase(); // Normalize email to lowercase

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match for ${email}:`, isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

