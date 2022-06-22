const db = require("../models/");
const fs = require("fs");

module.exports = {
	async getAll(req, res, next) {
		// return res.status(200).send(await db.Trip.findAll());
		res.send(await db.Trip.findAll());
	},

	async getById(req, res, next) {
		// res.status(200).send(req.trip);
		res.send(req.trip);
	},

	async getUserFromTrip(req, res, next) {
		return res.status(200).send(await req.trip.getUsers());
	},

	async create(req, res, next) {
		try {
			const trip = await db.Trip.create({
				title: req.body.title,
				description: req.body.description,
				startDate: req.body.startDate,
				owner: req.user.id,
			});

			if (req.file) {
				const file = await db.File.create({
					imageUrl: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
				});
				await trip.addFiles(file);
			}

			await req.user.addTrips(trip);

			return res.status(201).send(trip);
		} catch (err) {
			const error = new Error(err);
			error.code = 500;
			next(error);
		}
	},

	async getByUser(req, res, next) {
		return res.status(200).send(await req.user.getTrips());
	},

	async update(req, res, next) {
		if (req.body.title) {
			req.trip.title = req.body.title;
		}

		if (req.body.description) {
			req.trip.description = req.body.description;
		}

		if (req.body.startDate) {
			req.trip.startDate = req.body.startDate;
		}

		if (req.body.newuser) {
			const user = await db.User.findOne({
				where: { username: req.body.newuser },
			});

			if (!user) {
				return res.status(404).send("New user not found");
			}

			await req.trip.addUsers(user);
		}

		if (req.body.backgroundUrl) {
			req.trip.backgroundUrl = req.body.backgroundUrl;
		}

		try {
			const newData = await req.trip.save();
			return res.status(201).send(newData);
		} catch (err) {
			const error = new Error("Modification failed" + err);
			error.code = 500;
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const nb = await db.Trip.destroy({ where: { id: req.params.tripId } });

			if (nb > 0) res.status(201).send("trip deleted");
			else {
				const error = new Error("trip not found");
				error.code = 404;
				next(error);
			}
		} catch (err) {
			const error = new Error("Internal error " + err);
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
			return res.status(409).send("File already exist for this trip");
		}

		const file = await db.File.create({
			imageUrl: `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`,
		});

		await req.user.addFile(file);
		await req.trip.addFiles(file);

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

		const filename = data.imageUrl.split("/images/")[1];
		fs.unlink(`images/${filename}`, (err) => {
			if (err) return res.status(500).send(err);
		});

		await data.destroy();

		return res.status(201).send("file successfully deleted");
	},
};
