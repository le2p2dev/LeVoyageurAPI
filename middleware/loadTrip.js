const db = require("../models");

module.exports = {
  async loadTrip(req, res, next) {
    const trip = await db.Trip.findByPk(req.params.tripId, {
			include: db.File,
		});

		if (!trip) {
			const error = new Error("Trip not found");
			error.code = 404;
			return next(error);
		}

		req.trip = trip;

    return next();
  },
};
