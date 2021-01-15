const router = require('express').Router();
const db = require('../models');


router.post('/all', async (req, res) => {
	const students = await db.User.findAll({
		where: { utype: 1 },
		exclude: ['password', 'created_at', 'updated_at'],
		include: [{
			model: db.Student,
			attributes: ['semester'],
			raw: true
		}],
	});
	res.json(students.map(student => {
		student.dataValues.semester = student.Student.dataValues.semester;
		delete student.dataValues['Student'];
		console.log(student);
		return student;
	}));
});

module.exports = router;