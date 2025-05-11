const express = require('express');
const { processText } = require('../controllers/chatbotController');
const { validateTextRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * @route POST /v1/chatbot/text
 * @desc Process text for chatbot
 * @access Public
 */
router.post('/text', validateTextRequest, processText);

module.exports = router;