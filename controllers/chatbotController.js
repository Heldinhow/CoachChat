/**
 * Controller for chatbot text processing
 */

const https = require('https');
const axios = require('axios');

/**
 * @swagger
 * /chatbot/text:
 *   post:
 *     summary: Process text for chatbot
 *     description: Processes the provided text and returns a chatbot response
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const processText = async (req, res, next) => {
  try {
    const { text, url = 'dotacoach.gg', locale = 'pt-BR' } = req.body;
    
    console.log(`Processing text: "${text}" for URL: ${url}, Locale: ${locale}`);
    
    try {
      // Use axios instead of native https for better error handling
      console.log('Sending request to external API...');
      const response = await axios({
        method: 'POST',
        url: 'https://server.dotacoach.gg/v1/chatbot/text',
        headers: {
          'Host': 'server.dotacoach.gg',
          'Accept': 'application/json, text/plain, */*',
          'Sec-Fetch-Site': 'same-site',
          'Origin': 'https://dotacoach.gg', // Use the allowed origin
          'Sec-Fetch-Mode': 'cors',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
          'Referer': 'https://dotacoach.gg/',
          'Sec-Fetch-Dest': 'empty',
          'Accept-Language': 'pt-BR,pt;q=0.9',
          'Priority': 'u=3, i',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json'
        },
        data: {
          text: text,
          url: url,
          locale: locale
        },
        // Increase timeout to handle slow responses
        timeout: 10000
      });
      
      console.log('Received response from external API:', response.data);
      
      // Set cache headers for 5 minutes
      res.set('Cache-Control', 'public, max-age=300');
      
      // Return the external API response
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error making external API request:', error.message);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('External API error response:', {
          status: error.response.status,
          data: error.response.data
        });
        
        // If we got a CORS error, provide more helpful information
        if (error.response.status === 403 && 
            error.response.data && 
            error.response.data.message && 
            error.response.data.message.includes('CORS')) {
          return res.status(502).json({
            error: "CORS Error",
            message: "The external API rejected our request due to CORS policy. This proxy needs to be configured with proper origin headers.",
            details: error.response.data
          });
        }
        
        // Pass through the error from the external API
        return res.status(error.response.status).json({
          error: "External API Error",
          message: "The external API returned an error",
          details: error.response.data
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from external API');
        return res.status(504).json({
          error: "Gateway Timeout",
          message: "No response received from the external API"
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the external API request:', error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Failed to set up the request to the external API"
        });
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while processing your request"
    });
  }
};

module.exports = {
  processText
};