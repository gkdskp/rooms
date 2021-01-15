const DataTypes = require('sequelize').DataTypes;

module.exports = sequelize => {
	const Room = sequelize.define('Room', {
		no: {
			type: DataTypes.STRING,
			allowNull: false,
			primayKey: true
		},
		beds: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		rules: {
			type: DataTypes.ARRAY(DataTypes.INTEGER)
		}
	});
	
	Room.associate = (models) => {
		models.Room.hasMany(models.Student);
	}

	return Room;
};