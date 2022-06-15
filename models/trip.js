const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Trip extends Sequelize.Model {
		static associate(db) {
			Trip.belongsTo(db.User, { foreignKey: "owner", onDelete: "CASCADE" });
			Trip.belongsToMany(db.User, { through: "UserTrips" });
			Trip.hasMany(db.Step, { onDelete: "CASCADE" });
			Trip.hasMany(db.Poi, { onDelete: "CASCADE" });
			Trip.hasMany(db.Ride, { onDelete: "CASCADE" });
			Trip.hasMany(db.File, { onDelete: "CASCADE" });
		}
	}

	Trip.init(
		{
			title: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT("long"),
			},
			backgroundUrl: {
				type: Sequelize.STRING,
			},
			startDate: {
				type: Sequelize.DATEONLY,
			},
		},
		{
			sequelize,
			modelName: "Trip",
			timestamps: false,
		}
	);

  return Trip;
};

