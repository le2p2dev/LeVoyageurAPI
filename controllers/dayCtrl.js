const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Day.findAll());
  },

  async getById(req, res, next) {
    return res.status(200).send(await req.day);
  },

  async getByStep(req, res, next) {
    return res.status(200).send(await req.step.getDays());
  },

  async getByTrip(req, res, next) {
    return res.status(200).send(await req.trip.getDays());
  },

  async create(req, res, next) {
    if (!req.body.number) {
      return res.status(406).send("Number missing");
    }

    try {
      await db.Day.create({
        number: req.body.number,
        StepId: req.step.id,
      });
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async update(req, res, next) {
    if (req.body.number) req.day.number = number;

    req.day.stepId = req.step.id;

    try {
      const newData = await req.day.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed");
      error.code = 500;
      next(error);
    }
  },
};
