module.exports = (sequelize, Datatypes) => {
    const Trip = sequelize.define("Trip", {
      title: Datatypes.STRING,
      description: Datatypes.STRING,
      backgroundUrl: Datatypes.DATEONLY,
      startDate: Datatypes.DATEONLY,
    });
  
    Trip.associate = function (models) {
      models.Trip.hasMany(models.Step)
    };
    return Trip;
  };
  