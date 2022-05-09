const db = require("../models/");

module.exports = {
  async update(req, res, next) {
    if (!req.user) {
      req.status(404).send("No user found");
    }

    if (req.body.password) req.user.password = req.body.password;
    if (req.body.username) req.user.username = req.body.username;

    try {
      const newData = await req.user.save();
      return res.status(201).send(newData);
    } catch (err) {
      const error = new Error("Modification failed");
      error.code = 500;
      next(error);
    }
  },

  async delete(req, res, next) {
    if (!req.user) {
      return res.status(404).send("No user found");
    }

    try {
      const nb = await db.User.destroy({ where: { id: req.user.id } });

      if (nb > 0) res.status(201).send("user deleted");
      else {
        const error = new Error("user not found");
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
