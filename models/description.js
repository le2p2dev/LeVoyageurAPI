module.exports = (sequelize, Datatypes) => {
    const Description = sequelize.define("Description", {
        description: Datatypes.STRING
    });
  
    Description.associate = function (models) {
        models.Description.hasOne(models.Marker);
        models.Description.hasOne(models.Trip);
        models.Description.hasOne(models.Step);
    };
    return Description;
};
  