const router = require('express').Router();
const AuthController = require('../endpoints/auth');

/**
 * @api {post} /auth/register Log In endpoint
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiParam {String} email Email of the user
 * @apiParam {String} full_name Full name of the user
 * @apiParam {String} password Password of the user
 * @apiParam {Date} join_date Date in which the user joined the institution
 * 
 * @apiSuccess (200) {String} access_token
 * @apiError EmailAlreadyExists The <code>email</code> already exists
 * @apiError InvalidParmas The params used is invalid
 * @apiError UnknownError Unknown error occured
 */
router.post('/register', AuthController.register);

module.exports = router;