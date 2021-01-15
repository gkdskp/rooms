const router = require('express').Router();
const db = require('../models');
/**
 * @apiDefine NoTokenProvided
 * @apiError NotTokenProvided No <code>access_token</code> was found in 
 * request body
 */
/**
 * @apiDefine InvalidToken
 * @apiError InvalidToken <code>access_token</code> provided is invalid
 */
/**
 * @apiDefine NoSuchUser
 * @apiError NoSuchUser User identified by <code>access_token</code> no longer
 * exists
 */
/**
 * @apiDefine InvalidRequest
 * @apiError InvalidRequest Params are missing from the request body
 */
/**
 * @apiDefine UnknownError
 * @apiError UnknownError Unknown error occured while processing query
 */
/**
 * @api {post} /warden/fee/add Add Fee
 * @apiName Add Fee
 * @apiGroup Warden
 * 
 * @apiParam {String} access_token Access Token of the user
 * @apiParam {double} fee Fee amount
 * @apiParam {String} title Title of the fee
 * @apiParam {[Text]} description Description for the fee
 * @apiParam {Date} due Due date of the fee
 * 
 * @apiSuccess (200) {bool} success
 * 
 * @apiUse NoTokenProvided
 * @apiUse InvalidToken
 * @apiUse NoSuchUser
 * @apiUse InvalidRequest
 * @apiUse UnknownError
 */
function arrayRemove(arr, value) {

	return arr.filter(function (ele) {
		return ele != value;
	});
}

router.post('/batch', async (req, res) => {
	try {
		req.body.students.forEach(async student => {
			const {
				id,
				full_name,
				password,
				email,
				join_date,
				semester
			} = student;
			let [s,] = await db.User.findOrCreate({
				where: { id },
				defaults: {
					full_name,
					password,
					email,
					join_date,
					utype: 1
				}
			});
			s.student = await s.createStudent({ semester });
		});
		res.json({ "message": "Success" });
	} catch (_) {
		console.log(_);
		res.status(400).send({ "message": "Unknown error occured" });
	}
});

router.post('/all', async (req, res) => {
	const students = await db.User.findAll({
		where: { utype: 1 },
		exclude: ['password', 'created_at', 'updated_at'],
		include: [{
			model: db.Student,
			attributes: ['semester'],
			include: [{
				model: db.Room,
				attributes: ['no']
			}],
			raw: true
		}],
	});
	res.json(students.map(student => {
		student.dataValues.semester = student.Student.dataValues.semester;
		student.dataValues.room = student.Student.dataValues.Room.no;
		delete student.dataValues['Student'];
		return student;
	}));
});

router.post('/rooms/add', async (req, res) => {
	try {
		await req.body.rooms.forEach(async room => {
			const {
				no,
				beds,
				rules
			} = room;
			let sliced_rules = rules.slice(0, beds);
			let [] = await db.Room.findOrCreate({
				where: { no },
				defaults: {
					beds,
					rules: sliced_rules
				}
			});
		})
		res.json({ message: "Success" })
	} catch (_) {
		console.log(_);
		res.json({ message: _ })
	}
});

router.post('/rooms/all', async (req, res) => {
	try {
		let rooms = await db.Room.findAll({
			include: [
				{
					model: db.Student,
					attributes: ['id'],
					include: [
						{
							model: db.User,
							attributes: ['full_name']
						}
					]
				}
			]
		});
		let roomsSet = rooms.map(room => {
			room.dataValues.students = room.dataValues.Students.map(student => student.dataValues.User.dataValues.full_name);
			return room;
		})
		
		console.log(roomsSet)
		res.json(roomsSet);
	} catch (_) {
		console.log(_);
		res.json({ message: _ })
	}
});

router.post('/rooms/allote', async (req, res) => {
	try {
		const freeRooms = {};

		const rooms = await db.Room.findAll({
			include: {
				model: db.Student
			},
		});

		// Setting free rooms according to semester
		rooms.forEach(room => {
			if (room.Students?.length < room.beds) {
				let semesterRem = room.rules;
				room.Students.forEach(student => {
					semesterRem = arrayRemove(semesterRem, student.semester);
				});
				semesterRem.forEach(semester => {
					try {
						freeRooms[semester].push(room.id);
					} catch (_) {
						freeRooms[semester] = [room.id]
					}
				})
			}
		});

		const studentsWithoutRooms = await db.Student.findAll({
			where: { RoomId: null }
		});

		console.log(freeRooms);

		studentsWithoutRooms.forEach(async student => {
			if (freeRooms[student.semester]?.length != 0) {
				room_id = freeRooms[student.semester].pop();
				db.Student.update({
					RoomId: room_id,
				}, { where: { id: student.id } });
				console.log(`Alloted Room ${room_id} to Student ${student.id}`);
			} else {
				console.log(`No room left for S${student.semester} students`);
			}
		});

		res.send({ message: "Success" })
	} catch (_) {
		console.log(_);
		res.json({ message: _ });
	}
})

module.exports = router;