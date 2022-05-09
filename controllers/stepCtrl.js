const db = require("../models/");
const dayCtrl = require("../controllers/dayCtrl");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).json(await db.Step.findAll());
  },

  async getById(req, res, next) {
    res.status(200).json(req.step);
  },

  async create(req, res, next) {
    const trip = req.trip;

    if (!trip) {
      return res.status(404).json("trip not found");
    }

    if (!req.body.longitude || !req.body.latitude)
      return res.status(406).json("Latitude or longitude missing");

    try {
      const data = await db.Step.create({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        TripId: trip.id,
      });

      return res.status(201).json(data);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },

  async getByTrip(req, res, next) {
    return res.status(200).json(await req.trip.getSteps());
  },

  async update(req, res, next) {
    if (!req.step) {
      return res.status(404).json("No step found");
    }

    const beforeUp = req.step.duration;

    if (req.body.title) req.step.title = req.body.title;

    if (req.body.description) req.step.description = req.body.description;

    if (req.body.duration) req.step.duration = req.body.duration;

    if (req.body.latitude) req.step.latitude = req.body.latitude;

    if (req.body.longitude) req.step.longitude = req.body.longitude;

    try {
      const newData = await req.step.save();
      req.step = newData;

      // nouvelle duration inferieur a ancienne
      if (req.body.duration < beforeUp) {
        const dif = parseInt(beforeUp, 10) - parseInt(req.body.duration, 10);
        console.log("ici " + dif);
        const data = await db.Day.findAll({
          where: {
            StepId: req.step.id,
          },
        });

        console.log(data.length - dif);

        for (let index = data.length; index > data.length - dif; index--) {
          console.log("i " + index);
          const element = data[index - 1];
          await element.destroy();
        }
      }

      if (req.body.duration > beforeUp) {
        const data = await db.Day.findAll({
          where: {
            StepId: req.step.id,
          },
          order: [["number", "DESC"]],
        });

        for (
          let index = data.length;
          index < parseInt(req.body.duration);
          index++
        ) {
          const day = db.Day.build({
            number: index + 1,
            StepId: req.step.id,
          });

          day.save();
        }
      }

      return res.status(201).json(newData);
    } catch (err) {
      const error = new Error("Modification failed " + err);
      error.code = 500;
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const nb = await db.Step.destroy({ where: { id: req.params.stepId } });

      if (nb > 0) res.status(201).json("step deleted");
      else {
        const error = new Error("step not found");
        error.code = 404;
        next(error);
      }
    } catch (err) {
      const error = new Error("Internal error " + err);
      error.code = 500;
      next(error);
    }
  },
};
