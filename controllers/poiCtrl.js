const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Poi.findAll());
  },

  async getById(req, res, next) {
    return res.status(200).send(await req.poi);
  },

  async getByDay(req, res, next) {
    if (!req.day) res.status(404).send("No day found");

    return res.status(200).send(await req.day.getPois());
  },

  async getByTrip(req, res, next) {
    if (!req.trip) res.status(404).send("No trip found");
    
    return res.status(200).send(await req.trip.getPois());
  },

  async create(req, res, next) {
    if (!req.body.latitude || !req.body.longitude) {
      return res.status(406).send("Latitude or longitude missing");
    }

    if (!req.trip) {
      return res.status(404).send("Trip not found");
    }

    try {
      await db.POI.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        title: req.body.title,
        description: req.body.description,
        TripId: req.body.tripId,
      });
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async update(req, res, next) {
    if (!req.poi) {
      return res.status(404).send("No POI found");
    }

    if (req.body.title) req.poi.title = req.body.title;
    if (req.body.description) req.po.description = req.body.description;
    if (req.body.longitude) req.poi.longitude = req.body.longitude;
    if (req.body.latitude) req.poi.latitude = req.body.latitude;

    try {
      const newData = await req.poi.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed");
      error.code = 500;
      next(error);
    }
  },
};
