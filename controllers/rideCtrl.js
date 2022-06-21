const db = require("../models/");
const fs = require("fs");

module.exports = {
	async getAllByTrip(req, res, next) {
		const data = await db.Ride.findAll({
			include: {
				all: true,
			},
			where: {
				TripId: req.params.tripId,
			},
		});
		return res.status(200).send(data);
	},

	async getById(req, res, next) {
		res.status(200).send(req.ride);
	},

	async update(req, res, next) {
		const ride = await db.Ride.findByPk(req.params.rideId);

		if (!ride) {
			return res.status(404).send("No ride found");
		}

		if (req.body.travelType) {
			ride.travelType = req.body.travelType;
		}

		if (req.body.estimation) {
			ride.estimation = req.body.estimation;
		}

		try {
			return res.status(201).send(await ride.save());
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
			return res.status(409).send("File already exist for this user");
		}

		const file = await db.File.create({
			imageUrl: `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`,
		});

		await req.ride.addFiles(file);

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
			if (err)
				return res.status(500).send("Cannot delete file from the server");
		});

		await data.destroy();

		return res.status(201).send("file successfully deleted");
	},
};
