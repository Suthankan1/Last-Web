const express = require('express');
const router = express.Router(); // Create a new router object
const authController = require('../controllers/authController'); // Import your authentication controller
const authenticateToken = require('../middleware/authMiddleware'); // Import your authentication middleware

// Define authentication routes

/**
 * @route POST /api/signup
 * @description Register a new user.
 * This route handles user registration by calling the signup function from authController.
 * It expects 'name', 'email', 'password', and optionally 'user_type' in the request body.
 */
router.post('/signup', authController.signup);

/**
 * @route POST /api/login
 * @description Authenticate a user and return a JWT.
 * This route handles user login by calling the login function from authController.
 * It expects 'email' and 'password' in the request body.
 */
router.post('/login', authController.login);

/**
 * @route GET /api/dashboard
 * @description Protected route example - requires valid JWT token.
 * This route is protected by the authenticateToken middleware.
 * Only accessible if a valid JWT is provided in the Authorization header.
 * The user information (id, name, user_type) will be available in req.user
 * after successful token verification.
 */
router.get('/dashboard', authenticateToken, (req, res) => {
  // req.user is set by the authenticateToken middleware from the JWT payload.
  // The JWT payload (from authController.js) contains 'name', not 'username'.
  res.json({ message: `Welcome, ${req.user.name}!` });
});

module.exports = router; // Export the router to be used in your main server file (e.g., server.js or app.js)
