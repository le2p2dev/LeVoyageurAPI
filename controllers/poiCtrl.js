const db = require("../models/");
const fs = require("fs");

module.exports = {
	async getAll(req, res, next) {
		res.send(await db.Poi.findAll());
	},

	async getById(req, res, next) {
		res.status(200).send(await req.poi);
	},

	async getByDay(req, res, next) {
		return res.status(200).send(await req.day.getPois());
	},

	async getByStep(req, res, next) {
		return res.status(200).send(await req.step.getPois());
	},

	async getByTrip(req, res, next) {
		return res.status(200).send(await req.trip.getPois({ include: db.File }));
	},

	async create(req, res, next) {
		if (!req.body.latitude || !req.body.longitude) {
			return res.status(406).send("Latitude or longitude missing");
		}

		if (!req.trip) {
			return res.status(404).send("Trip not found");
		}

		try {
			const data = await db.Poi.create({
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				title: req.body.title,
				description: req.body.description,
				TripId: req.trip.id,
				UserId: req.user.id,
			});

			return res.status(201).send(data);
		} catch (err) {
			const error = new Error(err);
			error.code = 500;
			next(error);
		}
	},

	async update(req, res, next) {
		if (!req.poi) {
			return res.status(404).send("No POI found");
		}

		if (req.body.title) req.poi.title = req.body.title;
		if (req.body.description) req.poi.description = req.body.description;
		if (req.body.longitude) req.poi.longitude = req.body.longitude;
		if (req.body.latitude) req.poi.latitude = req.body.latitude;
		if (req.body.stepId) req.poi.StepId = req.body.stepId;

		if (req.body.dayId) {
			const day = await db.Day.findByPk(req.body.dayId);

			if (!day) {
				return res.status(404).send("No day found");
			}

			req.poi.addDays(day);
		}

		try {
			const newData = await req.poi.save();
			return res.status(201).send(newData);
		} catch (err) {
			const error = new Error("Modification failed: " + err);
			error.code = 500;
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const nb = await db.Poi.destroy({ where: { id: req.params.poiId } });

			if (nb > 0) res.status(201).send("poi deleted");
			else {
				const error = new Error("Poi not found");
				error.code = 404;
				next(error);
			}
		} catch (err) {
			const error = new Error("Internal error " + err);
			error.code = 500;
			next(error);
		}
	},

	async deleteFromStep(req, res, next) {
		if (!req.poi) {
			return res.status(404).send("No POI found");
		}

		req.poi.StepId = null;

		try {
			const newData = await req.poi.save();
			return res.status(201).send(newData);
		} catch (err) {
			const error = new Error("Modification failed: " + err);
			error.code = 500;
			next(error);
		}
	},

	async addFile(req, res, next) {
		if (!req.file) {
			return res.status(406).send("Image required");
		}

		const data = await db.File.findOne({
			where: {
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
			},
		});

		if (data) {
			return res.status(409).send("File already exist for this poi");
		}

		const file = await db.File.create({
			imageUrl: `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`,
		});

		await req.poi.addFiles(file);

		return res.status(200).send(file);
	},

	async deleteFile(req, res, next) {
		if (!req.params.fileId) {
			return res.status(406).send("fileId required");
		}

		const data = await db.File.findByPk(req.params.fileId);

		if (!data) {
			return res.status(404).send("No file found");
		}

		const filename = await data.imageUrl.split("/images/")[1];

		fs.unlink(`images/${filename}`, (err) => {
			if (err) return res.status(500).send(err);
		});

		await data.destroy();

		return res.status(201).send("file successfully deleted");
	},
};
