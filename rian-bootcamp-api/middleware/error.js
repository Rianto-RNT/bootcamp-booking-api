const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for development
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with _id of ${err.value}. Please add correct _id`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
