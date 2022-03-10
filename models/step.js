module.exports = (sequelize, Datatypes) => {
    const Step = sequelize.define("Step", {
        title: Datatypes.STRING,
        description: Datatypes.DATEONLY,
        duration: Datatypes.DATEONLY,
    });
    
    return Step
}