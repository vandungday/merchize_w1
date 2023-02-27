const swaggerDefinition = {
  info: {
    title: 'CRUD WITH REDIS AND MONGODB',
    description: ' DOC API REST',
  },
  servers: ['http://localhost:3030'],
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/user.route.js', './routes/user.redis.route.js'],
};

/**
 * @param {express} app
 */
const setup = (app) =>
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
  );

module.exports = setup;
