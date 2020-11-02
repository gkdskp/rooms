const DataTypes = require('sequelize').DataTypes;

module.exports = sequelize => {
	const Fee = sequelize.define('fee', {
		fee: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		due: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});

	return Fee;
};