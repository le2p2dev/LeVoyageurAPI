const db = require("../models");

module.exports = {
  async loadDay(req, res, next) {
    const day = await db.Day.findAll({
      where: { id: req.params.dayId },
      include: db.Poi,
    });

    if (!day) {
      const error = new Error("Trip not found");
      error.code = 404;
      return next(error);
    }

    req.day = day;

    return next();
  },
};
