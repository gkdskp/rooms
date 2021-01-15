const router = require('express').Router();
const AuthController = require('../endpoints/auth');
const db = require('../models');
const { WardenMiddleware } = require('../middlewares');

/**
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Auth
 * 
 * @apiParam {String} email Email of the user
 * @apiParam {String} full_name Full name of the user
 * @apiParam {String} password Password of the user
 * @apiParam {Date} join_date Date in which the user joined the institution
 * 
 * @apiSuccess (200) {String} access_token
 * 
 * @apiError EmailAlreadyExists The <code>email</code> already exists
 * @apiError InvalidRequest The params used is invalid
 * @apiError UnknownError Unknown error occured
 */
// router.post('/register', AuthController.register);

/**
 * @api {post} /auth/login Log In
 * @apiName Log In
 * @apiGroup Auth
 * 
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 * 
 * @apiSuccess (200) {String} access_token
 * 
 * @apiError InvalidRequest The params used is invalid
 * @apiError InvalidEmail The email used does not exist in database
 * @apiError WrongPassword The email and password does not match
 * @apiError UnknownError Unknown error occured
 */
router.post('/login', AuthController.login);

module.exports = router;