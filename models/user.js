module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  /*

  User.associate = function (models) {
    models.User.belongsTo(models.Game, { foreignKey: "fk_User_Game" });
  };

  */
  return User;
};
