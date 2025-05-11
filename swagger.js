const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chatbot Text API',
      version: '1.0.0',
      description: 'API for chatbot text processing',
      contact: {
        name: 'API Support',
        url: 'https://dotacoach.gg/support',
      },
    },
    servers: [
      {
        url: '/v1',
        description: 'API v1',
      },
    ],
    components: {
      schemas: {
        TextRequest: {
          type: 'object',
          required: ['text'],
          properties: {
            text: {
              type: 'string',
              description: 'The text to be processed by the chatbot',
            },
            url: {
              type: 'string',
              description: 'The URL context for the request',
              default: 'dotacoach.gg',
            },
            locale: {
              type: 'string',
              description: 'The locale for the response',
              default: 'pt-BR',
            },
          },
        },
        TextResponse: {
          type: 'object',
          properties: {
            answer: {
              type: 'string',
              description: 'The chatbot response to the text',
            },
            metadata: {
              type: 'object',
              properties: {
                confidence: {
                  type: 'number',
                  description: 'Confidence score of the answer',
                },
                source: {
                  type: 'string',
                  description: 'Source of the information',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            error: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js', './index.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
