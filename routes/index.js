const express = require('express');
const chatbotRoutes = require('./chatbot');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Chatbot routes
router.use('/chatbot', chatbotRoutes);

module.exports = router;