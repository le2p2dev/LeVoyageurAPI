const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Poi extends Sequelize.Model {
    static associate(db) {
      Poi.belongsToMany(db.Day, { through: "DayPoi" });
    }
  }

  Poi.init(
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "Poi",
      timestamps: false,
    }
  );

  return Poi;
};
