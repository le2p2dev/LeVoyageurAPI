module.exports = (sequelize, Datatypes) => {
    const RideType = sequelize.define("RideType", {
        type: Datatypes.STRING,
    });
    
    return RideType
}