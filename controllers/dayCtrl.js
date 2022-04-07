const db = require("../models/");

module.exports = {
  getAll(req, res, next) {
    db.Day.findAll().then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
  },

  getById(req, res, next) {
    db.Day.findByPk(req.params.id).then((data) => {
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(404).send("data not found");
    });
  },

  async create(req, res, next) {
    if (!req.body.number) {
      return res.status(406).send("Number missing");
    }

    const data = await db.Day.findAll({
      where: { number: req.body.number },
    });

    if (data.length !== 0) {
      return res
        .status(406)
        .send("Number: " + req.body.number + " allready exist");
    }

    try {
      db.Day.create({
        number: req.body.number,
      }).then((data) => {
        return res.status(201).send(data);
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
