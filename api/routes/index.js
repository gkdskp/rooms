const router = require('express').Router();
const authRouter = require('./auth');
const wardenRouter = require('./warden');
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
router.use('/warden', WardenMiddleware, wardenRouter);

module.exports = router;