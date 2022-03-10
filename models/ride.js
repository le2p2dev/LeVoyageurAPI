module.exports = (sequelize, Datatypes) => {
    const Ride = sequelize.define("Ride", {

    });
    
    Ride.associate = function (models) {
        models.Ride.belongsTo(models.RideType)
        models.Ride.belongsTo(models.Step, {
            as: "Step_idStart"
        })
        models.Ride.belongsTo(models.Step, {
            as: "Step_idEnd"
        })
    };

    return Ride
}