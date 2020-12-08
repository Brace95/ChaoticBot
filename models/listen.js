const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    return sequelize.define('listening-channels', {
		channel_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		}
	}, {
		timestamps: false,
	});
}