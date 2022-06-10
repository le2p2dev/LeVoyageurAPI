const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class File extends Sequelize.Model {
		static associate(db) {}
	}

	File.init(
		{
			imageUrl: {
				type: Sequelize.STRING,
			},
		},
		{
			sequelize,
			modelName: "File",
			timestamps: false,
		}
	);

	return File;
};
