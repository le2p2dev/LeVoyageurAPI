module.exports = (sequelize, Datatypes) => {
    const Poi = sequelize.define("Poi", {
        title: Datatypes.STRING,
        description: Datatypes.STRING,
        longitude: Datatypes.DOUBLE,
        latitude: Datatypes.DOUBLE,
    });
    
    Poi.associate = function (models) {
        models.Poi.belongsTo(models.Poitype)
    };

    return Poi
}