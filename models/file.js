module.exports = (sequelize, Datatypes) => {
    const File = sequelize.define("File", {
        url: Datatypes.STRING,
    });

    File.associate = function (models) {
        models.File.belongsTo(models.Trip)
        models.File.belongsTo(models.Poi)
        models.File.belongsTo(models.Step)
        models.File.belongsTo(models.Ride)
        models.File.belongsTo(models.User)
    };
    
    return File
}