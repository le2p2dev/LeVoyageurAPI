const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../models/");
const fs = require("fs");

module.exports = {
	async getAllJournal(req, res, next) {
		return res.status(202).send(req.journal);
	},

	async create(req, res, next) {
		if (!req.body.title) {
			return res.status(406).send("content is missing");
		}

		try {
			const data = await db.Journal.create({
				UserId: req.user.id,
				TripId: req.trip.id,
				title: req.body.title,
				content: req.body.content,
				creationDate: Date.now(),
			});

			return res.status(201).send(data);
		} catch (err) {
			const error = new Error(err);
			error.code = 500;
			next(error);
		}
	},

	async update(req, res, next) {
		const journal = await db.Journal.findByPk(req.params.journalId);

		if (!journal) {
			return res.status(404).send("No journal entries found");
		}

		if (req.body.title) {
			journal.title = req.body.title;
		}

		if (req.body.content) {
			journal.content = req.body.content;
		}

		try {
			journal.modificationDate = Date.now();
			await journal.save();
			return res.status(201).send(journal);
		} catch (err) {
			const error = new Error(err);
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

		await req.journal.addFiles(file);

		return res.status(200).send(file);
	},

	async deleteFile(req, res, next) {
		if (!req.params.idFile) {
			return res.status(406).send("fileId required");
		}

		const data = await db.File.findByPk(req.params.fileId);

		if (!data) {
			return res.status(404).send("No file found");
		}

		await data.destroy();

		const filename = data.imageUrl.split("/images/")[1];
		fs.unlink(`images/${filename}`, (err) => {
			if (err) console.log(err);
		});

		return res.status(201).send("file successfully deleted");
	},
};
