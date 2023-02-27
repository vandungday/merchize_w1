const UserRedisService = require('../services/user.redis.service');

exports.createUser = async (req, res, next) => {
  const { object, user } = await UserRedisService.createUser(req.body);

  if (!user) {
    return res.status(409).json({
      status: 'fail',
      message: 'user already exist',
    });
  }

  res.status(200).json({
    status: 'success',
    data: object,
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await UserRedisService.getAllUSer();

  res.status(200).json({
    status: 'success',
    data: users,
  });
};

exports.getUser = async (req, res, next) => {
  const user = await UserRedisService.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No user found with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.updateUser = async (req, res, next) => {
  const user = await UserRedisService.updateUserById(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No user found with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await UserRedisService.deleteUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No user found with that ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
