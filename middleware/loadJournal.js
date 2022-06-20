const db = require("../models");

// get all journal input from a trip
module.exports = {
	async loadJournal(req, res, next) {
		const journal = await db.Journal.findAll({
			where: {
				TripId: req.params.tripId,
			},
			include: [
				{
					model: db.File,
				},
				{
					model: db.Trip,
				},
				{
					model: db.User,
				},
			],
		});

		if (!journal) {
			const error = new Error("No journal entries found");
			error.code = 404;
			return next(error);
		}

		req.journal = journal;

		return next();
	},
};
