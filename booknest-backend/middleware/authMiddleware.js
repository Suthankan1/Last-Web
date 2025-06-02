const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

/**
 * Middleware to authenticate JWT tokens.
 * This function checks if a valid JWT is present in the request header
 * and verifies it against the JWT_SECRET. If valid, it decodes the token
 * and attaches the user payload to the request object.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
function authenticateToken(req, res, next) {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];
  // Extract the token from the "Bearer TOKEN" format
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, deny access
  if (!token) {
    console.log('Authentication failed: No token provided.');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token using the JWT_SECRET from environment variables
  try {
    // jwt.verify decodes the token if it's valid and throws an error if not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user payload to the request object
    // This makes user information available to subsequent route handlers
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails (e.g., token is expired or invalid signature)
    console.error('Authentication failed: Invalid token', err);
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;
