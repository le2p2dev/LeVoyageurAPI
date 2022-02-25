module.exports = (sequelize, Datatypes) => {
    const Trip = sequelize.define("Trip", {
      tripName: Datatypes.STRING,
      description: Datatypes.STRING,
      startDate: Datatypes.DATEONLY,
      endDate: Datatypes.DATEONLY,
    });
  
    Trip.associate = function (models) {
      models.Trip.hasOne(models.Marker);
      models.Trip.hasMany(models.Step)
    };

    return Trip;
  };
  