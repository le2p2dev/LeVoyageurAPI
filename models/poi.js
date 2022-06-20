const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Poi extends Sequelize.Model {
    static associate(db) {
      Poi.belongsToMany(db.Day, { through: "DayPoi" });
      Poi.hasMany(db.File, { onDelete: "CASCADE" });
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
      category: {
        type: Sequelize.STRING,
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
