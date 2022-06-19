const db = require("../models");

module.exports = {
  async loadStep(req, res, next) {
    const step = await db.Step.findByPk(req.params.stepId, {
			include: db.File,
		});

    if (!step) {
      const error = new Error("Step not found");
      error.code = 404;
      return next(error);
    }

    req.step = step;

    return next();
  },
};
