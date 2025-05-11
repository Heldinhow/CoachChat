/**
 * Validation middleware
 */

/**
 * Validate text request body
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateTextRequest = (req, res, next) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'The "text" field is required in the request body'
    });
  }
  
  if (typeof text !== 'string') {
    return res.status(400).json({
      error: 'Invalid field type',
      message: 'The "text" field must be a string'
    });
  }
  
  if (text.trim() === '') {
    return res.status(400).json({
      error: 'Invalid field value',
      message: 'The "text" field cannot be empty'
    });
  }
  
  // Optional: Add url and locale validation if needed
  
  next();
};

module.exports = {
  validateTextRequest
};