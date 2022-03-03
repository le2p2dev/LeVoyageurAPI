module.exports = (sequelize, Datatypes) => {
  const Marker = sequelize.define("Marker", {
    pinNumber: Datatypes.INTEGER,
    title: Datatypes.STRING,
    description: Datatypes.STRING,
    latitude: Datatypes.FLOAT,
    longitude: Datatypes.FLOAT,
    category: Datatypes.STRING
  });

  return Marker;
};
