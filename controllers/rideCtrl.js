const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).json(await db.Ride.findAll());
  },

  async getById(req, res, next) {
    res.status(200).json(req.ride);
  },

  async create(req, res, next) {
    if (!trip) {
      return res.status(404).json("trip not found");
    }

    if (!req.body.startStep || !req.body.endStep)
      return res.status(406).json("Start step or end step missing");

    if (!days) return res.status(404).json("no days found");

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

      return res.status(201).json(data);
    } catch (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    }
  },
};
