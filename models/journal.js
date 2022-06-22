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
			title: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.TEXT("long"),
			},
			creationDate: {
				type: Sequelize.DATEONLY,
			},
			modificationDate: {
				type: Sequelize.DATEONLY,
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
