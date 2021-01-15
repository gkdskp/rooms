const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const AuthController = {};

// AuthController.register = (req, res) => {
// 	let { email, full_name, password, join_date } = req.body;

// 	if (!email || !full_name || !password || !join_date) {
// 		res.status(400).json({ "error": "InvalidRequest" });
// 		return;
// 	}

// 	bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
// 		if (err) {
// 			res.status(400).json({ "error": "UnknownError" });
// 			return;
// 		}

// 		password = hash;
// 	});

// 	db.User.findOrCreate({
// 		where: { email },
// 		defaults: { email, full_name, password, join_date }
// 	}).then(([User, created]) => {
// 		if (!created) {
// 			res.status(409).json({ "error": "EmailAlreadyExists" });
// 			return;
// 		}

// 		const access_token = jwt.sign({ id: User.id }, process.env.JWT_SECRET);
// 		res.status(200).json({ access_token });
// 	}).catch((_) => {
// 		console.error(_);
// 		res.status(400).json({ "error": "UnknownError" });
// 	});
// }

AuthController.login = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ "error": "InvalidRequest" });
		return;
	}

	db.User.findOne({ where: { email: email, password } }).then(User => {
		if (!User) {
			res.status(403).json({ "error": "InvalidEmail" });
			return;
		}
		const access_token = jwt.sign(
			{ id: User.id },
			process.env.JWT_SECRET
		);

		res.status(200).json({ access_token });
	});
}

module.exports = AuthController;