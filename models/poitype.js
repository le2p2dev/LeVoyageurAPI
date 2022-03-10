module.exports = (sequelize, Datatypes) => {
    const PoiType = sequelize.define("Poitype", {
        type: {
            type: Datatypes.STRING,
            unique: true
        }
    });
    
    return PoiType
}