const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Ride.findAll());
  },

  async getById(req, res, next) {
    res.status(200).send(req.ride);
  },

  async create(req, res, next) {
    if (!trip) {
      return res.status(404).send("trip not found");
    }

    if (!req.body.startStep || !req.body.endStep)
      return res.status(406).send("Start step or end step missing");

    if (!days) return res.status(404).send("no days found");

    const days = await db.Step.findAll({
      where: {
        [Op.or]: [{ id: req.body.startStep }, { id: req.body.endStep }],
      },
    });

    try {
      const data = await db.Ride.create({
        startStep: req.body.startStep,
        endStep: req.body.endStep,
      });

      return res.status(201).send(data);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },
};
