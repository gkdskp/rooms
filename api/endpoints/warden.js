const db = require('../models');

const WardenController = {};

WardenController.addFee = (req, res) => {
	const { fee, title, description, due } = req.body;

	if(! fee || ! title || ! due) {
		res.status(400).json({"error": "InvalidRequest"});
		return;
	}

	db.fee.create({fee, title, description, due}).then(fee => {
		if(! fee) {
			res.status(400).json({"error": "UnknownError"});
			return;
		}

		res.json({"success": true});
	}).catch((_) => {
		console.error(_);
		res.status(400).json({"error": "UnknownError"});
	});
}

module.exports = WardenController;