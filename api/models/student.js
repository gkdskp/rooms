const DataTypes = require('sequelize').DataTypes;

module.exports = sequelize => {
	const Student = sequelize.define('student', {
		semester: {
			type: DataTypes.INTEGER
		}
	});

	return Student;
};