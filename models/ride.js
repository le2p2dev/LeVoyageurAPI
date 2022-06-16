const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Ride extends Sequelize.Model {
		static associate(db) {
			Ride.belongsTo(db.Step, { as: "stepStart", foreignKey: "startStep" });
			Ride.belongsTo(db.Step, { as: "stepEnd", foreignKey: "endStep" });
			Ride.hasMany(db.File, { onDelete: "CASCADE" });
		}
	}

  Ride.init(
		{
			order: {
				type: Sequelize.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "Ride",
			timestamps: false,
		}
	);

  return Ride;
};
