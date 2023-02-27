const User = require('../models/User');
const ErrorResponse = require('../middlewares/ErrorResponse');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise <User>}
 */

exports.createUser = async (userBody) => {
  return await User.create(userBody);
};

/**
 * Get all users
 * @param {Object} userBody
 * @returns {Promise <Users[]>}
 */
exports.getAllUSer = async () => {
  return await User.find();
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    throw new ErrorResponse('No user found with that ID', 404);
  }

  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise <User>}
 */

exports.updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody);

  if (!user) {
    throw new ErrorResponse('No user found with that ID', 404);
  }

  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise <User>}
 */
exports.deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ErrorResponse('No user found with that ID', 404);
  }

  return user;
};
