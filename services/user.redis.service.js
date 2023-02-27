const connectRedis = require("../connections/redis");
const client = connectRedis();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Object, Promise<User>}
*/

exports.createUser = async (userBody) => {
  const key = `id:${userBody.id}`;
  console.log(userBody.id);
  const object = {
    id: userBody.id,
    username: userBody.username,
    password: userBody.password,
  };

  const user = await client.HSETNX('user', key, JSON.stringify(object));

  return { object, user };
};

/**
 * Get all users
 * @param
 * @returns {Promise <Users[]>}
 */
exports.getAllUSer = async () => {
  const value = await client.HGETALL('user');

  const key = Object.keys({ ...value });

  const users = [];
  for (let i = 0; i < key.length; i++) {
    const object = {
      [key[i]]: JSON.parse({ ...value }[`${key[i]}`]),
    };

    users.push(object);
  }

  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise <User>}
 */

exports.getUserById = async (id) => {
  const value = await client.HGETALL('user');
  const keys = Object.keys({ ...value });

  for (key of keys) {
    if (key === `id:${id}`) {
      const user = {
        [key]: JSON.parse({ ...value }[`${key}`]),
      };
      return user;
    }
  }
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise <User>}
 */

exports.updateUserById = async (userId, updateBody) => {
  const value = await client.HGETALL('user');
  const keys = Object.keys({ ...value });

  for (key of keys) {
    // neu ton tai user voi id = key
    if (key === `id:${userId}`) {
      // lay ra user ton tai
      const userExistInRedis = JSON.parse({ ...value }[`${key}`]);

      // sua lai thuoc tinh ngoai tru id
      const object = {
        username: updateBody.username ?? userExistInRedis.username,
        password: updateBody.password ?? userExistInRedis.password,
      };

      const user = await client.HSET('user', key, JSON.stringify(object));

      return user;
    }
  }
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise <User>}
 */
exports.deleteUserById = async (userId) => {
  const value = await client.HGETALL('user');
  const keys = Object.keys({ ...value });

  for (key of keys) {
    // neu ton tai user voi id = key
    if (key === `id:${userId}`) {
      const user = await client.HDEL('user', key);

      return user;
    }
  }
};
