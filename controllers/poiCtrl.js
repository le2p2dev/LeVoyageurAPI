const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    res.json(await db.Poi.findAll());
  },

  async getById(req, res, next) {
    res.json(await req.poi);
  },

  async getByDay(req, res, next) {
    return res.status(200).json(await req.day.getPois());
  },

  async getByStep(req, res, next) {
    return res.status(200).json(await req.step.getPois());
  },

  async getByTrip(req, res, next) {
    return res.status(200).json(await req.trip.getPois());
  },

  async create(req, res, next) {
    if (!req.body.latitude || !req.body.longitude) {
      return res.status(406).json("Latitude or longitude missing");
    }

    if (!req.trip) {
      return res.status(404).json("Trip not found");
    }

    try {
      const data = await db.Poi.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        title: req.body.title,
        description: req.body.description,
        TripId: req.trip.id,
        UserId: req.user.id,
      });

      return res.status(201).json(data);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async update(req, res, next) {
    if (!req.poi) {
      return res.status(404).json("No POI found");
    }

    if (req.body.title) req.poi.title = req.body.title;
    if (req.body.description) req.poi.description = req.body.description;
    if (req.body.longitude) req.poi.longitude = req.body.longitude;
    if (req.body.latitude) req.poi.latitude = req.body.latitude;
    if (req.body.stepId) req.poi.StepId = req.body.stepId;
    if (req.body.dayId) req.poi.DayId = req.body.dayId;

    try {
      const newData = await req.poi.save();
      return res.status(201).json(newData);
    } catch (err) {
      const error = new Error("Modification failed: " + err);
      error.code = 500;
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const nb = await db.Poi.destroy({ where: { id: req.params.poiId } });

      if (nb > 0) res.status(201).json("poi deleted");
      else {
        const error = new Error("Poi not found");
        error.code = 404;
        next(error);
      }
    } catch (err) {
      const error = new Error("Internal error " + err);
      error.code = 500;
      next(error);
    }
  },

  async deleteFromStep(req, res, next) {
    if (!req.poi) {
      return res.status(404).json("No POI found");
    }

    req.poi.StepId = null;

    try {
      const newData = await req.poi.save();
      return res.status(201).json(newData);
    } catch (err) {
      const error = new Error("Modification failed: " + err);
      error.code = 500;
      next(error);
    }
  },
};
