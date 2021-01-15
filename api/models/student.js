const DataTypes = require('sequelize').DataTypes;

module.exports = sequelize => {
	const Student = sequelize.define('Student', {
		semester: {
			type: DataTypes.INTEGER
		}
	});

	Student.associate = (models) => {
		models.Student.belongsTo(models.User, {
			foreignKey: "id"
		});
		models.Student.belongsTo(models.Room);
		models.Student.hasMany(models.Leave);
	}

	return Student;
};