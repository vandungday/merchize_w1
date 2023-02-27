const express = require('express');
const router = express.Router();
const userRedisController = require('../controllers/user.redis.controller');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');

router
  .route('/')
  .get(validate(userValidation.getUser), userRedisController.getAllUsers)
  .post(userRedisController.createUser);

router
  .route('/:id')
  .get(validate(userValidation.getUsers), userRedisController.getUser)
  .patch(validate(userValidation.updateUser), userRedisController.updateUser)
  .delete(validate(userValidation.deleteUser), userRedisController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User Redis
 */

/**
 * @swagger
 * /redis/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags: [User Redis]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /redis/users:
 *  post:
 *    summary: Creates a new user.
 *    tags: [User Redis]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            id:
 *              type: string
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                id:string
 *                username:string
 *                password:string
 */

/**
 * @swagger
 * /redis/users/{userId}:
 *   get:
 *     summary: Get a user by id
 *     tags: [User Redis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       "200":
 *         description: Success
 *       "404":
 *         description: User not found,
 *       "500":
 *          description: Server error,
 *
 *   patch:
 *     summary: Update user by id
 *     tags: [User Redis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       "200":
 *         description: Success
 *       "404":
 *         description: User not found,
 *       "500":
 *          description: Server error,
 *
 *   delete:
 *     summary: Delete a user
 *     tags: [User Redis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id
 *     responses:
 *       "204":
 *         description: Success
 *       "404":
 *         description: User not found,
 *       "500":
 *          description: Server error,
 */
