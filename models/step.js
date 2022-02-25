module.exports = (sequelize, Datatypes) => {
    const Step = sequelize.define("Step", {
        stepName: Datatypes.STRING,
        startDate: Datatypes.DATEONLY,
        endDate: Datatypes.DATEONLY,
        order: Datatypes.INTEGER
    });
    
    Step.associate = function (models) {
        models.Step.hasOne(models.Marker);
    };

    return Step
}