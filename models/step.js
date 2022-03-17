module.exports = (sequelize, Datatypes) => {
    const Step = sequelize.define("Step", {
        title: Datatypes.STRING,
        description: Datatypes.STRING,
        duration: Datatypes.INTEGER,
    });
    
    Step.associate = function (models) {
        models.Step.hasMany(models.Poi)
      };

    return Step
}