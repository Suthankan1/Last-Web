const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston'); // For logging
require('dotenv').config(); // Load environment variables from .env file

// Import your authentication routes
const authRoutes = require('./routes/authRoutes');

// Initialize the Express application
const app = express();
// Define the port for the server, defaulting to 5000
const PORT = process.env.PORT || 5000;

// Configure winston logger for application logging
const logger = winston.createLogger({
  // Set the minimum level of messages to log (e.g., 'info', 'warn', 'error')
  level: 'info',
  // Define the format of the log messages
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.errors({ stack: true }), // Include stack trace for errors
    winston.format.splat(), // Enable string interpolation
    winston.format.json() // Output logs in JSON format
  ),
  // Define where the logs should be transported (saved)
  transports: [
    // Log only 'error' level messages to a dedicated error file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Log all messages (info and above) to a combined log file
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// In development environments, also log messages to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Simple format for console readability
  }));
}

// --- Middleware Setup ---

// Enable Cross-Origin Resource Sharing (CORS) for all routes.
// This allows your frontend (e.g., React app running on a different port)
// to make requests to this backend server.
app.use(cors());

// Parse incoming JSON requests. This middleware makes JSON data
// submitted in the request body available on `req.body`.
app.use(express.json());

// --- Route Handling ---

// Mount the authentication routes under the '/api' prefix.
// All routes defined in authRoutes.js will be prefixed with '/api' (e.g., /api/signup, /api/login).
app.use('/api', authRoutes);

// --- Global Error Handling Middleware ---
// This middleware catches any errors that occur during request processing
// in any of the routes or preceding middleware. It should be defined last.
app.use((err, req, res, next) => {
  // Log the error using winston for detailed server-side debugging
  logger.error('Global Error Handler: %o', err);

  // Send a generic 500 Internal Server Error response to the client.
  // Avoid sending sensitive error details to the client in production.
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// --- Database Connection ---

// Connect to MongoDB using Mongoose.
// The MONGODB_URI should be defined in your .env file.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('✅ Connected to MongoDB'); // Log successful connection

    // Start the Express server only after a successful database connection.
    // This prevents the server from running if the database is not available.
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`); // Log server start
    });
  })
  .catch((err) => {
    // Log any MongoDB connection errors
    logger.error('❌ MongoDB connection error: %o', err);
    // Exit the process if unable to connect to the database, as the app cannot function without it.
    process.exit(1); // Exit with a failure code
  });
