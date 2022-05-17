const db = require("../models/");
const { Op } = require("sequelize");

module.exports = {
	async getAllByTrip(req, res, next) {
		const data = await db.Ride.findAll({
			where: {
				TripId: req.params.tripId,
			},
		});
		return res.status(200).send(data);
	},

	async getById(req, res, next) {
		res.status(200).send(req.ride);
	},

	async create(req, res, next) {
		// if (!req.body.startStep || !req.body.endStep)
		//   return res.status(406).send("Start step or end step missing");

		// const step = await db.Step.findAll({
		//   where: {
		//     [Op.or]: [{ id: req.body.startStep }, { id: req.body.endStep }],
		//   },
		// });

		// if (!step) {
		//   return res.status(404).send("no step found");
		// }

		// try {
		//   const data = await db.Ride.create({
		//     startStep: req.body.startStep,
		//     endStep: req.body.endStep,
		//   });

		//   return res.status(201).send(data);
		// } catch (err) {
		//   const error = new Error(err);
		//   error.code = 500;
		//   next(error);
		// }
		const nbData = await db.Ride.count({ where: { TripId: req.trip.id } });
		console.log(nbData);
	},
};
