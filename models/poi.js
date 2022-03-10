module.exports = (sequelize, Datatypes) => {
    const Poi = sequelize.define("Poi", {
        title: Datatypes.STRING,
        description: Datatypes.STRING,
        longitude: Datatypes.DOUBLE,
        latitude: Datatypes.DOUBLE,
    });
    
    return Poi
}