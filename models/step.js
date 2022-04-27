const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Step extends Sequelize.Model {
    static associate(db) {
      Step.hasMany(db.Day);
      Step.hasMany(db.Ride, { foreignKey: "startStep" });
      Step.hasMany(db.Ride, { foreignKey: "endStep" });
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
    },
    {
      sequelize,
      modelName: "Step",
      timestamps: false,
    }
  );

  return Step;
};
