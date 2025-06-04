const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Your authentication middleware
const User = require('../models/User'); // Import your User model

// Define authentication routes

/**
 * @route POST /api/signup
 * @description Register a new user.
 */
router.post('/signup', authController.signup);

/**
 * @route POST /api/login
 * @description Authenticate a user and return a JWT.
 */
router.post('/login', authController.login);

/**
 * @route GET /api/dashboard
 * @description Protected route example - requires valid JWT token.
 */
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}!` });
});

/**
 * @route GET /api/admin/users
 * @description Admin-only route to fetch all users.
 * This route is protected by the authenticateToken middleware.
 * Additionally, it checks if the authenticated user has 'admin' user_type.
 */
router.get('/admin/users', authenticateToken, async (req, res) => {
  // Log who is trying to access this route
  console.log(`Attempting to fetch users by: ${req.user.email} (Type: ${req.user.user_type})`);

  // Check if the authenticated user is an admin
  if (req.user.user_type !== 'admin') {
    console.log(`Access denied for ${req.user.email}: Not an admin.`);
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    // Fetch all users, selecting only _id, name, email, and user_type
    // We explicitly exclude 'password' for security.
    const users = await User.find({}, '_id name email user_type');
    console.log(`Successfully fetched ${users.length} users.`);
    res.status(200).json(users);
  } catch (err) {
    console.error('Backend Error: Failed to fetch users for admin:', err);
    // Ensure JSON error response even for server errors
    res.status(500).json({ message: 'Failed to fetch users due to server error.', error: err.message });
  }
});

module.exports = router;
