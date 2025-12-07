// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(' Error:', err);

  // Use provided statusCode or default to 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    // Include validation errors only if they exist
    errors: err.errors || null
  });
};

module.exports = errorHandler;
