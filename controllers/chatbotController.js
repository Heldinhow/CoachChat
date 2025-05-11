/**
 * Controller for chatbot text processing
 */

/**
 * Process text for chatbot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const processText = async (req, res, next) => {
  try {
    const { text, url = 'dotacoach.gg', locale = 'pt-BR' } = req.body;
    
    console.log(`Processing text: "${text}" for URL: ${url}, Locale: ${locale}`);
    
    // Here you would typically call an external service or process the text
    // For demo purposes, we'll just return a mock response
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response based on the text
    let response;
    if (text.toLowerCase().includes('legion')) {
      response = {
        answer: "Legion Commander tem uma taxa de vitória de 49.8% no patch atual.",
        metadata: {
          confidence: 0.92,
          source: "dotacoach.gg/stats"
        }
      };
    } else if (text.toLowerCase().includes('win rate')) {
      response = {
        answer: "Para informações sobre taxa de vitória, por favor especifique um herói.",
        metadata: {
          confidence: 0.75,
          source: "dotacoach.gg"
        }
      };
    } else {
      response = {
        answer: "Desculpe, não entendi sua pergunta. Poderia reformular?",
        metadata: {
          confidence: 0.5,
          source: "default"
        }
      };
    }
    
    // Set cache headers for 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processText
};