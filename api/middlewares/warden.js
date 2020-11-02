const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	let decoded = {};
	
	if(! req.body?.access_token) {
		res.status(400).json({"error": "NoTokenProvided"});
		return;
	}

	try {
		decoded.id = jwt.verify(req.body.access_token, process.env.JWT_SECRET);
	} catch(_) {
		console.error(_);
	}

	if(! decoded.id) {
		res.status(403).json({"error": "InvalidToken"});
		return;
	}

	db.user.findOne({where: {id: decoded.id.id}}).then(user => {
		// TODO: Check if user is an warden
		if(! user || user.leave_at) {
			res.status(403).json({"error": "NoSuchUser"});
			return;
		}

		next();
	});
}