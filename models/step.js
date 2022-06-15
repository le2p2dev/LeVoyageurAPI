const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Step extends Sequelize.Model {
    static associate(db) {
			Step.hasMany(db.Day, { onDelete: "CASCADE" });
			Step.hasMany(db.Poi);
			Step.hasMany(db.File, { onDelete: "CASCADE" });
		}
  }

  Step.init(
		{
			title: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			duration: {
				type: Sequelize.INTEGER,
			},
			longitude: {
				type: Sequelize.DOUBLE,
			},
			latitude: {
				type: Sequelize.DOUBLE,
			},
			order: {
				type: Sequelize.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "Step",
			timestamps: false,
		}
	);

  return Step;
};
