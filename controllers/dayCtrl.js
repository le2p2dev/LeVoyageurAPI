const db = require("../models/");
const { Op } = require("sequelize");

module.exports = {
  async getAll(req, res, next) {
    return res.status(200).send(await db.Day.findAll());
  },

  async getById(req, res, next) {
    console.log(req.day);
    return res.status(200).send(await req.day);
  },

  async getByStep(req, res, next) {
    const data = await req.step.getDays();
    return res.status(200).json(data);
  },

  async getByTrip(req, res, next) {
    return res.status(200).send(await req.trip.getDays());
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

  async deleteAll(req, res, next) {
    try {
      const nb = await db.Day.destroy({ where: { StepId: req.step.id } });

      if (nb > 0) res.status(201).send("days deleted");
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

  async deleteDay(req, res, next) {
    const nbDays = await db.Day.count({
      where: {
        StepId: req.params.stepId,
      },
    });

    if (nbDays == req.params.number) {
      try {
        const nb = await db.Day.destroy({
          where: {
            number: req.params.number,
          },
        });

        if (nb > 0) res.status(201).send("days deleted");
        else {
          const error = new Error("day not found");
          error.code = 404;
          next(error);
        }
      } catch (err) {
        const error = new Error("Internal error " + err);
        error.code = 500;
        next(error);
      }
    } else if (req.params.number == 1) {
      try {
        const nb = await db.Day.destroy({
          where: {
            number: req.params.number,
          },
        });

        if (nb > 0) {
          const days = await db.Day.findAll({
            where: {
              StepId: req.step.id,
            },
          });

          if (days) {
            days.forEach((element) => {
              element.number--;
              element.save();
            });
          }

          return res.status(200).send("ok");
        } else {
          const error = new Error("day not found");
          error.code = 404;
          next(error);
        }
      } catch (err) {
        const error = new Error("Internal error " + err);
        error.code = 500;
        next(error);
      }
    } else {
      try {
        const nb = await db.Day.destroy({
          where: {
            number: req.params.number,
          },
        });

        if (nb > 0) {
          const days = await db.Day.findAll({
            where: {
              StepId: req.step.id,
              number: {
                [Op.gt]: parseInt(req.params.number, 10),
              },
            },
          });

          days.forEach((element) => {
            element.number--;
            element.save();
          });

          return res.status(200).send("ok");
        } else {
          const error = new Error("day not found");
          error.code = 404;
          next(error);
        }
      } catch (err) {
        const error = new Error("Internal error " + err);
        error.code = 500;
        next(error);
      }
    }
  },
};
