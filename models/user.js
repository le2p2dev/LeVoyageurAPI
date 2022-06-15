const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {
    static associate(db) {
      User.belongsToMany(db.Trip, { through: "UserTrips" });
      User.hasMany(db.Poi);
      User.hasMany(db.File, { onDelete: "CASCADE" });
    }
  }

  User.init(
    {
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      avatar: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );

  return User;
};
