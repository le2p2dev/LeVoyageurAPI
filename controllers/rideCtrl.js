const db = require("../models/");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Ride.findAll());
  },
  async getById(req, res, next) {
    res.status(200).send(req.ride);
  },
};
