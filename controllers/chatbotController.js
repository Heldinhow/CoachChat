/**
 * Controller for chatbot text processing
 */

const https = require('https');

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
    
    // Forward the request to the external API
    const options = {
      hostname: 'server.dotacoach.gg',
      path: '/v1/chatbot/text',
      method: 'POST',
      headers: {
        'Host': 'server.dotacoach.gg',
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Site': 'same-site',
        'Origin': 'https://dotacoach.gg',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
        'Referer': 'https://dotacoach.gg/',
        'Sec-Fetch-Dest': 'empty',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Priority': 'u=3, i',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
      }
    };

    // Create a promise to handle the HTTP request
    const externalApiRequest = new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            console.error('Error parsing response:', error);
            resolve({
              answer: "Erro ao processar resposta do servidor externo.",
              metadata: {
                confidence: 0,
                source: "error"
              }
            });
          }
        });
      });
      
      request.on('error', (error) => {
        console.error('Error making external request:', error);
        reject(error);
      });
      
      // Send the request body
      const requestBody = JSON.stringify({
        text: text,
        url: url,
        locale: locale
      });
      
      request.write(requestBody);
      request.end();
    });

    // Wait for the external API response
    console.log('Sending request to external API...');
    const externalResponse = await externalApiRequest;
    console.log('Received response from external API:', externalResponse);
    
    // Set cache headers for 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    
    // Return the external API response
    return res.status(200).json(externalResponse);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      answer: "Ocorreu um erro ao processar sua solicitação.",
      metadata: {
        confidence: 0,
        source: "error"
      }
    });
  }
};

module.exports = {
  processText
};