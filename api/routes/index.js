const router = require('express').Router();
const authRouter = require('./auth');
const wardenRouter = require('./warden');
const leaveRouter = require('./leave');
const studentRouter = require('./student');
const feeRouter = require('./fee');
const {WardenMiddleware} = require('../middlewares');

/**
 * @api {get} / Test
 * @apiName Root
 * @apiGroup Root
 * 
 * @apiDescription Endpoint to test server status
 * 
 * @apiSuccess {String} OK
*/
router.get('/', (req, res) => {
	res.send('OK');
});

router.use('/auth', authRouter);
router.use('/warden', wardenRouter);
router.use('/student', WardenMiddleware, studentRouter);
router.use('/leave', leaveRouter);
router.use('/fee', feeRouter);

module.exports = router;