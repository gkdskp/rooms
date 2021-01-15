const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false	
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		join_date: {
			type: DataTypes.STRING,
			allowNull: false
		},
		leave_date: {
			type: DataTypes.STRING
		},
		created_at: {
			type: Sequelize.DATE(3),
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
		},
		updated_at: {
			type: Sequelize.DATE(3),
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),	
		},
		utype: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});

	User.associate = (models) => {
		models.User.hasOne(models.Student, {
			foreignKey: 'id'
		});
	}

	return User;
}