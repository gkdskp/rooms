const db = require('../models');
const jwt = require('jsonwebtoken');

const AuthController = {};

AuthController.register = (req, res) => {
	const { email, full_name, password, join_date } = req.body;

	// Checking if any of the params is missing
	if(! email || ! full_name || ! password || ! join_date) 
	{
		res.status(400).json({
			"error": "InvalidParams"
		});
		return;
	}
	
	db.user.findOrCreate({
		where: {
			email
		},
		defaults: {
			email,
			full_name,
			password,
			join_date
		}
	}).then(([user, created]) => {
		// Checking if the user already exists
		if(! created) {
			res.status(409).json({
				"error": "EmailAlreadyExists"
			});
			return;
		}

		const access_token = jwt.sign({
			id: user.id
		}, process.env.JWT_SECRET);

		res.status(200).json({
			access_token
		});
	}).catch((_) => {
		// Unknown error occured
		console.error(_);
		res.status(400).json({
			"error": "UnknownError"
		});
	});
}

module.exports = AuthController;