const db = require("../models/");
const dayCtrl = require("../controllers/dayCtrl");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Step.findAll());
  },

  async getById(req, res, next) {
    res.status(200).send(req.step);
  },

  async create(req, res, next) {
    const trip = req.trip;

    if (!trip) {
      return res.status(404).send("trip not found");
    }

    if (!req.body.longitude || !req.body.latitude)
      return res.status(406).send("Latitude or longitude missing");

    try {
      const data = await db.Step.create({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        TripId: trip.id,
      });

      for (let number = 1; number < duration; number++) {
        await db.Day.create({
          number: number,
          StepId: req.step.id,
        });
      }

      return res.status(201).send(data);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async getByTrip(req, res, next) {
    return res.status(200).send(await req.trip.getSteps());
  },

  async update(req, res, next) {
    if (!req.step) {
      return res.status(404).send("No step found");
    }

    if (req.body.title) req.step.title = req.body.title;

    if (req.body.description) req.step.description = req.body.description;

    if (req.body.duration) req.step.duration = req.body.duration;

    if (req.body.latitude) req.step.latitude = req.body.latitude;

    if (req.body.longitude) req.step.longitude = req.body.longitude;

    try {
      const newData = await req.step.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed");
      error.code = 500;
      next(error);
    }
  },
};
