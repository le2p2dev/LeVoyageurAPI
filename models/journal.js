const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Journal extends Sequelize.Model {
		static associate(db) {
			Journal.belongsTo(db.File, { onDelete: "CASCADE" });
			Journal.belongsTo(db.User);
			Journal.belongsTo(db.Trip);
		}
	}

	Journal.init(
		{
			content: {
				type: Sequelize.STRING,
			},
		},
		{
			sequelize,
			modelName: "Journal",
			timestamps: false,
		}
	);

	return Journal;
};
