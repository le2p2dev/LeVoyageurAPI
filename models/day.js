const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Day extends Sequelize.Model {
    static associate(db) {
      Day.belongsToMany(db.Poi, { through: "DayPoi" });
    }
  }

  Day.init(
    {
      number: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Day",
      timestamps: false,
    }
  );

  return Day;
};
