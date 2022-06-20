const db = require("../models");

module.exports = {
  async loadPoi(req, res, next) {
    const poi = await db.Poi.findByPk(req.params.poiId, {
			include: [
				{
					model: db.Day,
				},
				{
					model: db.File,
				},
			],
		});

    if (!poi) {
      const error = new Error("Poi not found");
      error.code = 404;
      return next(error);
    }

    req.poi = poi;

    return next();
  },
};
