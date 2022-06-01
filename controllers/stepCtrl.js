const db = require("../models/");
const dayCtrl = require("../controllers/dayCtrl");
const { Op } = require("sequelize");

module.exports = {
	async getAll(req, res, next) {
		return res.status(200).send(await db.Step.findAll({ include: db.Ride }));
	},

	async getById(req, res, next) {
		res.status(200).send(req.step);
	},

	async create(req, res, next) {
		const trip = req.trip;

		if (!trip) {
			return res.status(404).send("trip not found");
		}

		if (!req.body.longitude || !req.body.latitude)
			return res.status(406).send("Latitude or longitude missing");

		const nbStep = await db.Step.count({
			where: {
				TripId: req.params.tripId,
			},
		});

		try {
			const data = await db.Step.create({
				title: req.body.title,
				description: req.body.description,
				duration: req.body.duration,
				longitude: req.body.longitude,
				latitude: req.body.latitude,
				TripId: req.params.tripId,
				order: nbStep + 1,
			});

			const allRide = await db.Ride.findAll({
				where: {
					TripId: req.params.tripId,
				},
				order: [["order", "DESC"]],
			});

			if (allRide.length == 0) {
				db.Ride.create({
					startStep: data.id,
					TripId: req.params.tripId,
					order: 1,
				});

				return res.status(201).send(data);
			}

			const lastride = allRide[0];
			console.log(lastride);

			if (lastride.endStep == null) {
				lastride.endStep = data.id;
				lastride.TripId = req.params.tripId;
				lastride.save();

				return res.status(201).send(data);
			}

			if (allRide.endStep !== null) {
				db.Ride.create({
					startStep: lastride.endStep,
					endStep: data.id,
					TripId: req.params.tripId,
					order: lastride.order + 1,
				});
			}

			return res.status(201).send(data);
		} catch (err) {
			const error = new Error(err);
			error.code = 500;
			next(error);
		}
	},

	async getByTrip(req, res, next) {
		const data = await db.Step.findAll({
			where: { TripId: req.params.tripId },
		});
		return res.status(200).send(data);
	},

	async update(req, res, next) {
		if (!req.step) {
			return res.status(404).send("No step found");
		}

		const beforeUp = req.step.duration;

		if (req.body.title) req.step.title = req.body.title;

		if (req.body.description) req.step.description = req.body.description;

		if (req.body.duration) req.step.duration = req.body.duration;

		if (req.body.latitude) req.step.latitude = req.body.latitude;

		if (req.body.longitude) req.step.longitude = req.body.longitude;

		try {
			const newData = await req.step.save();
			req.step = newData;

			// nouvelle duration inferieur a ancienne
			if (req.body.duration < beforeUp) {
				const dif = parseInt(beforeUp, 10) - parseInt(req.body.duration, 10);
				console.log("ici " + dif);
				const data = await db.Day.findAll({
					where: {
						StepId: req.step.id,
					},
				});

				console.log(data.length - dif);

				for (let index = data.length; index > data.length - dif; index--) {
					console.log("i " + index);
					const element = data[index - 1];
					await element.destroy();
				}
			}

			if (req.body.duration > beforeUp) {
				const data = await db.Day.findAll({
					where: {
						StepId: req.step.id,
					},
					order: [["number", "DESC"]],
				});

				for (
					let index = data.length;
					index < parseInt(req.body.duration);
					index++
				) {
					const day = db.Day.build({
						number: index + 1,
						StepId: req.step.id,
					});

					day.save();
				}
			}

			return res.status(201).send(newData);
		} catch (err) {
			const error = new Error("Modification failed " + err);
			error.code = 500;
			next(error);
		}
	},

	async delete(req, res, next) {
		const ride = await db.Ride.findAll({
			where: {
				TripId: req.params.tripId,
				[Op.or]: {
					startStep: {
						[Op.gte]: req.params.stepId,
					},
					endStep: {
						[Op.gte]: req.params.stepId,
					},
				},
			},
			order: [["order", "ASC"]],
		});

		if (ride.length == 1) {
			if (req.params.stepId == ride[0].startStep) {
				ride[0].startStep = ride[0].endStep;
				ride[0].endStep = null;
			}
			if (req.params.stepId == ride[0].endStep) {
				ride[0].endStep = null;
			}
		} else if (ride[0].startStep == req.params.stepId) {
			for (let index = 0; index <= ride.length - 1; index++) {
				if (index == 0) {
					ride[index].startStep = ride[index].endStep;
					ride[index].endStep = ride[index + 1].endStep;
				}

				if (index < ride.length - 1 && index != 0) {
					ride[index].endStep = ride[index + 1].endStep;
					ride[index].startStep = ride[index + 1].startStep;
				}

				if (index == ride.length - 1) {
					ride[index].startStep = ride[index].endStep;
					ride[index].endStep = null;
				}

				ride[index].save();
			}
		} else {
			for (let index = 0; index <= ride.length - 1; index++) {
				if (index == 0) {
					ride[index].endStep = ride[index + 1].endStep;
				}

				if (index < ride.length - 1 && index != 0) {
					ride[index].endStep = ride[index + 1].endStep;
					ride[index].startStep = ride[index + 1].startStep;
				}

				if (index == ride.length - 1) {
					ride[index].startStep = ride[index].endStep;
					ride[index].endStep = null;
				}

				ride[index].save();
			}
		}

		try {
			const nb = await db.Step.destroy({ where: { id: req.params.stepId } });
			const sup = await db.Ride.destroy({
				where: {
					startStep: {
						[Op.eq]: null,
					},
					endStep: {
						[Op.eq]: null,
					},
				},
			});

			console.log(sup);
			if (nb > 0) res.status(201).send("step deleted");
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
};
