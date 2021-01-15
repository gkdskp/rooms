const router = require('express').Router();
const db = require('../models');
const WardenController = require('../endpoints/warden');
const studentMiddleware = require('../middlewares/student');
const Op = require('sequelize').Op;

router.post('/add', WardenController.addFee);

router.post('/all', async (req, res) => {
	const fee = await db.fee.findAll({});
	res.json(fee);
});

router.post('/:id/unpaid', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const student = await db.Student.findAll({
		include: [{
			model: db.User,
			exclude: ["password"]
		}]
	});
	const unpaid = [];

	for(let i = 0; i < student.length; i++) {
		const paid = await db.Paid.findOne({
			where: {
				StudentId: student[i].id,
				feeId: id
			}
		});
		if(paid == null) unpaid.push(student[i]);
	}
	
	res.json(unpaid);
})

router.post('/:id/paid', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const student = await db.Student.findAll({
		include: [{
			model: db.User,
			exclude: ["password"]
		}]
	});
	const paidStudents = [];

	for(let i = 0; i < student.length; i++) {
		const paid = await db.Paid.findOne({
			where: {
				StudentId: student[i].id,
				feeId: id
			}
		});
		if(paid != null) paidStudents.push(student[i]);
	}
	
	res.json(paidStudents);
})

router.post('/user', studentMiddleware, async (req, res) => {
	let fee = await db.fee.findAll({ raw: true });
	const due_fee = [];

	for(let i = 0; i < fee.length; i++) {
		const hasPayed = await db.Paid.findOne({
			where: {
				StudentId: req.user.id,
				feeId: fee[i].id
			},
			raw: true
		});
		if(hasPayed == null) {
			due_fee.push(fee[i])
		}
	}

	const paid_fee = await db.fee.findAll({
		include: [{
			model: db.Student,
			as: 'paid_students',
			where: { id: req.user.id },
		}]
	})

	res.json({
		due_fee,
		paid_fee
	});
})

router.post('/:id/pay', studentMiddleware,  async (req, res) => {
	const id = parseInt(req.params.id, 10);
	await db.Paid.create({
		feeId: id,
		StudentId: req.user.id
	})
	res.json({ message: "Success" });
})

router.post('/:id/delete', studentMiddleware,  async (req, res) => {
	const id = parseInt(req.params.id, 10);
	await db.fee.destroy({
		where: { id: id }
	})
	res.json({ message: "Success" });
})


module.exports = router;