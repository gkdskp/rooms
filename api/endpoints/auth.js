const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const AuthController = {};

AuthController.register = (req, res) => {
	const { email, full_name, password, join_date } = req.body;

	if(! email || ! full_name || ! password || ! join_date) {
		res.status(400).json({"error": "InvalidParams"});
		return;
	}

	bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
		if(err) {
			res.status(400).json({"error": "UnknownError"});
			return;
		}

		password = hash;
	});
	
	db.user.findOrCreate({
		where: { email },
		defaults: { email, full_name, password, join_date }
	}).then(([user, created]) => {
		if(! created) {
			res.status(409).json({"error": "EmailAlreadyExists"});
			return;
		}

		const access_token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
		res.status(200).json({ access_token });
	}).catch((_) => {
		console.error(_);
		res.status(400).json({"error": "UnknownError"});
	});
}

AuthController.login = (req, res) => {
	const { email, password } = req.body;

	if(! email || ! password) {
		res.status(400).json({"error": "InvalidParams"});
		return;
	}

	db.user.findOne({where: {email: email}}).then(user => {
		if(! user) {
			res.status(403).json({"error": "InvalidEmail"});
			return;
		}

		bcrypt.compare(password, user.password, (err, result) => {
			if(! result || err) {
				res.status(403).json({"error": "WrongPassword"});
				return;
			}

			const access_token = jwt.sign(
				{id: user.id}, 
				process.env.JWT_SECRET
			);
	
			res.status(200).json({access_token});
		});
	});
}

module.exports = AuthController;