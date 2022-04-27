const db = require("../models");

module.exports = {
  async loadRide(req, res, next) {
    const ride = await db.Ride.findByPk(req.params.rideId);

    if (!ride) {
      const error = new Error("Ride not found");
      error.code = 404;
      return next(error);
    }

    req.ride = ride;

    return next();
  },
};
