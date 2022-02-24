module.exports = (sequelize, Datatypes) => {
    const Trip = sequelize.define("Trip", {
      tripName: Datatypes.STRING,
      description: Datatypes.STRING,
      startDate: Datatypes.DATEONLY,
      endDate: Datatypes.DATEONLY,
    });
  
    return Trip;
  };
  