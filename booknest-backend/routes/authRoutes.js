const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected route example - requires valid JWT token
router.get('/dashboard', authenticateToken, (req, res) => {
  // req.user is set by authenticateToken middleware from JWT payload
  res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
