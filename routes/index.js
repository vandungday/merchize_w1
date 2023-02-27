const userRouter = require('./user.route');
const errorController = require('../controllers/error.controller');
const userRedisRouter = require('./user.redis.route');

module.exports = (app) => {
  app.use('/mongodb/users', userRouter);
  app.use('/redis/users', userRedisRouter);

  app.use(errorController);
};
