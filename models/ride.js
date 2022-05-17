const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Ride extends Sequelize.Model {
    static associate(db) {}
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
