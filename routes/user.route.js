const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');

router
  .route('/')
  .get(validate(userValidation.getUser), userController.getAllUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:id')
  .get(validate(userValidation.getUsers), userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User Mongo
 */

/**
 * @swagger
 * /mongodb/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags: [User Mongo]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /mongodb/users:
 *  post:
 *    summary: Creates a new user.
 *    tags: [User Mongo]
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
 *                username:string
 *                password:string
 */

/**
 * @swagger
 * /mongodb/users/{userId}:
 *   get:
 *     summary: Get a user by id
 *     tags: [User Mongo]
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
 *     tags: [User Mongo]
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
 *     tags: [User Mongo]
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
