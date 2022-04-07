const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}

  User.init(
    {
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );

  return User;
};
