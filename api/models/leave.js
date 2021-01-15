const DataTypes = require('sequelize').DataTypes;

module.exports = sequelize => {
	const Leave = sequelize.define('Leave', {
		reason: {
			type: DataTypes.STRING,
			allowNull: false
		},
		from: {
			type: DataTypes.DATE,
			allowNull: false
		},
		to: {
			type: DataTypes.DATE,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	});

	Leave.associate = (models) => {
		models.Leave.belongsTo(models.Student);
	}

	return Leave;
};