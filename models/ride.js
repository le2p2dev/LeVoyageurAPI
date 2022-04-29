const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Ride extends Sequelize.Model {
    static associate(db) {}
  }

  Ride.init(
    {},
    {
      sequelize,
      modelName: "Ride",
      timestamps: false,
    }
  );

  return Ride;
};
