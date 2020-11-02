const router = require('express').Router();
const WardenController = require('../endpoints/warden');

/**
 * @apiDefine NoTokenProvided
 * @apiError NotTokenProvided No <code>access_token</code> was found in 
 * request body
 */
/**
 * @apiDefine InvalidToken
 * @apiError InvalidToken <code>access_token</code> provided is invalid
 */
/**
 * @apiDefine NoSuchUser
 * @apiError NoSuchUser User identified by <code>access_token</code> no longer
 * exists
 */
/**
 * @apiDefine InvalidRequest
 * @apiError InvalidRequest Params are missing from the request body
 */
/**
 * @apiDefine UnknownError
 * @apiError UnknownError Unknown error occured while processing query
 */
/**
 * @api {post} /warden/fee/add Add Fee
 * @apiName Add Fee
 * @apiGroup Warden
 * 
 * @apiParam {String} access_token Access Token of the user
 * @apiParam {double} fee Fee amount
 * @apiParam {String} title Title of the fee
 * @apiParam {[Text]} description Description for the fee
 * @apiParam {Date} due Due date of the fee
 * 
 * @apiSuccess (200) {bool} success
 * 
 * @apiUse NoTokenProvided
 * @apiUse InvalidToken
 * @apiUse NoSuchUser
 * @apiUse InvalidRequest
 * @apiUse UnknownError
 */
router.post('/fee/add', WardenController.addFee);

module.exports = router;