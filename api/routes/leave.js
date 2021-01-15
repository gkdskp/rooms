const router = require('express').Router();
const db = require('../models');
const studentMiddleware = require('../middlewares/student');

router.post('/add', studentMiddleware, (req, res) => {
	try {
		const {
			reason,
			from,
			to
		} = req.body;

		const student = db.Leave.create({
			reason,
			from,
			to,
			StudentId: req.user.id
		});

		res.send({ message: "Success" })
	} catch(_) {
		console.log(_);
		res.send({ message: _ });
	}
});

router.post('/all', async (req, res) => {
	try {
		const leaves = await db.Leave.findAll({
			include: [
				{
					model: db.Student,
					include: [{
						model: db.User,
						attributes: ['full_name']
					}]
				}
			]
		});

		res.send(leaves);
	} catch(_) {
		console.log(_);
		res.send({ message: _ });
	}
});

router.post('/user', studentMiddleware, async (req, res) => {
	try {
		const leave = await db.Leave.findAll({
			where: {
				StudentId: req.user.id
			}
		});
		res.send(leave);
	} catch(_) {
		console.log(_);
		res.send({ message: _ })
	}
});

router.post('/:id/accept', async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		await db.Leave.update(
			{status: 1},
			{where: { id }}
		);
		res.send({ message: "Success" });
	} catch(_) {
		console.log(_);
		res.send({ message: _ });
	}
});

router.post('/:id/decline', async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		await db.Leave.update(
			{status: 2},
			{where: { id }}
		);
		res.send({ message: "Success" });
	} catch(_) {
		console.log(_);
		res.send({ message: _ });
	}
});


module.exports = router;