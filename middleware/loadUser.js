const db = require("../models/");

module.exports = {
  async loadUser(req, res, next) {
    const user = await db.User.findByPk(req.params.id, { include: db.File });

    if (!user) {
      const error = new Error("User not found");
      error.code = 404;
      return next(error);
    }

    req.user = user;

    return next();
  },
};
