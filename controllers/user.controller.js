const asyncHandler = require('../middlewares/asyncHandler');
const userMongoService = require('../services/user.mongo.service');
const publishService = require("../services/publish.service")

exports.createUser = asyncHandler(async (req, res, next) => {
  const newUser = await userMongoService.createUser(req.body);

  // pub rabbitmq
  await publishService.createUser({newUser})

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userMongoService.getAllUSer();

  res.status(200).json({
    status: 'success',
    total: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await userMongoService.getUserById(req.params.id);

  return res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await userMongoService.updateUserById(req.params.id, req.body);

  await publishService.updateUser({user})

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userMongoService.deleteUserById(req.params.id);

  await publishService.deleteUser({user})
  

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
