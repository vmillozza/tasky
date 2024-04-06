// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentazione API Express con Swagger',
    version: '1.0.0',
    description: 'Questa è una documentazione API generata da Swagger',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Server di Sviluppo',
    },
  ],
  // qui puoi aggiungere altre configurazioni globali come security, tags, ecc.
};

const options = {
  swaggerDefinition,
  // Percorso dei file che contengono i commenti JSDoc per Swagger
  apis: ['./api/*.js', './app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
