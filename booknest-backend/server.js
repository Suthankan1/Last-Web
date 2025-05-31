const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
require('dotenv').config();  // Load env variables from .env file

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',  // Log info and above (warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Include stack trace
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Only errors here
    new winston.transports.File({ filename: 'logs/combined.log' }), // All logs
  ],
});

// Also log to console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', authRoutes);

// Global error handling middleware (only one)
app.use((err, req, res, next) => {
  logger.error('Error handler: %o', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('✅ Connected to MongoDB');

    // Start server only after DB connection is successful
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error: %o', err);
  });
