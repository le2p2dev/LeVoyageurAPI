const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Trip extends Sequelize.Model {
    static associate(db) {
      Trip.belongsTo(db.User, { foreignKey: "owner" });
      Trip.belongsToMany(db.User, { through: "UserTrips" });
      Trip.hasMany(db.Step);
      Trip.hasMany(db.Poi);
    }
  }

  Trip.init(
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
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
