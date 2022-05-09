const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    // return res.status(200).json(await db.Trip.findAll());
    res.json(await db.Trip.findAll());
  },

  async getById(req, res, next) {
    // res.status(200).json(req.trip);
    res.json(req.trip);
  },

  async create(req, res, next) {
    console.log(req.user);
    if (!req.user) {
      return res.status(404).json("User not found");
    }

    try {
      const trip = await db.Trip.create({
        title: req.body.title,
        description: req.body.description,
        backgroundUrl: req.body.backgroundUrl,
        startDate: req.body.startDate,
        owner: req.user.id,
      });

      await req.user.addTrips(trip);

      return res.status(200).json(trip);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async getByUser(req, res, next) {
    return res.status(200).json(await req.user.getTrips());
  },

  async update(req, res, next) {
    if (!req.trip.id) {
      return res.status(404).json("No trip found");
    }

    if (req.body.title) {
      req.trip.title = req.body.title;
    }
    if (req.body.description) {
      req.trip.description = req.body.description;
    }
    if (req.body.backgroundUrl) {
      req.trip.backgroundUrl = req.body.backgroundUrl;
    }
    if (req.body.startDate) {
      req.trip.startDate = req.body.startDate;
    }

    try {
      const newData = await req.trip.save();
      return res.status(201).json(newData);
    } catch (err) {
      const error = new Error("Modification failed" + err);
      error.code = 500;
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
			const nb = await db.Trip.destroy({ where: { id: req.params.tripId } });

			if (nb > 0)
				res.status(201).json("trip deleted");
			else {
				const error = new Error("trip not found");
				error.code = 404;
				next(error);
			}
		}
		catch (err) {
			const error = new Error("Internal error " + err);
			error.code = 500;
			next(error);
		}
  },
};
