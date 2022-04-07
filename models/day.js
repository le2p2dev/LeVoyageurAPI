const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Day extends Sequelize.Model {
    static associate(db) {
      Day.hasMany(db.Step);
      Day.belongsToMany(db.Poi, { through: "Day_has_poi" });
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
