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
      const data = await db.Poi.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        title: req.body.title,
        description: req.body.description,
        TripId: req.trip.id,
        UserId: req.user.id,
      });

      return res.status(201).send(data);
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

    const step = await db.Step.findByPk(req.body.stepId);

    if (!step) {
      return res.status(404).send("No step found");
    }

    if (req.body.title) req.poi.title = req.body.title;
    if (req.body.description) req.poi.description = req.body.description;
    if (req.body.longitude) req.poi.longitude = req.body.longitude;
    if (req.body.latitude) req.poi.latitude = req.body.latitude;
    if (req.body.stepId) req.poi.StepId = req.body.stepId;

    try {
      const newData = await req.poi.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed: " + err);
      error.code = 500;
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
			const nb = await db.Poi.destroy({ where: { id: req.params.poiId } });

			if (nb > 0)
				res.status(201).send("poi deleted");
			else {
				const error = new Error("Poi not found");
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

  async deleteFromStep(req, res, next) {
    if (!req.poi) {
      return res.status(404).send("No POI found");
    }

    req.poi.StepId = null;

    try {
      const newData = await req.poi.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed: " + err);
      error.code = 500;
      next(error);
    }
  },
};
