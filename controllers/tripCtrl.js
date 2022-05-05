const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Trip.findAll());
  },

  async getById(req, res, next) {
    res.status(200).send(req.trip);
  },

  async create(req, res, next) {
    console.log(req.user);
    if (!req.user) {
      return res.status(404).send("User not found");
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

      return res.status(200).send(trip);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async getByUser(req, res, next) {
    return res.status(200).send(await req.user.getTrips());
  },

  async update(req, res, next) {
    if (!req.trip.id) {
      return res.status(404).send("No trip found");
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
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed");
      error.code = 500;
      next(error);
    }
  },
};
