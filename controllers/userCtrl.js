const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../models/");
const fs = require("fs");

module.exports = {
	async update(req, res, next) {
		if (!req.user) {
			return res.status(404).send("No user found");
		}

		if (req.file) {
			req.user.avatar = `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`;

			const newData = await req.user.save();
			return res.status(201).send(newData);
		}

		if (req.body.username) req.user.username = req.body.username;

		if (req.body.password) {
			if (!req.body.currentPassword) {
				return res.status(406).send("No current password");
			}

			const valid = await bcrypt.compare(
				req.body.currentPassword,
				req.user.password
			);

			if (!valid) {
				return res.status(401).send("Invalid current password");
	
		}
			const hashpassword = await bcrypt.hash(req.body.password, 10);
			req.user.password = hashpassword;
		}

		try {
			const newData = await req.user.save();
			return res.status(201).send(newData);
		} catch (err) {
			const error = new Error("Modification failed");
			error.code = 500;
			next(error);
		}
	},

	async delete(req, res, next) {
		if (!req.user) {
			return res.status(404).send("No user found");
		}

		if (req.user.avatar) {
			const filename = req.user.avatar.split("/images/")[1];
			fs.unlink(`images/${filename}`, (err) => {
				if (err) console.log(err);
			});
		}

		try {
			const nb = await db.User.destroy({ where: { id: req.user.id } });

			if (nb > 0) res.status(201).send("user deleted");
			else {
				const error = new Error("user not found");
				error.code = 404;
				next(error);
			}
		} catch (err) {
			const error = new Error("Internal error " + err);
			error.code = 500;
			next(error);
		}
	},

	async getbyId(req, res, next) {
		return res.status(202).send(req.user);
	},

	async addUserFile(req, res, next) {
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
		await req.user.addFiles(file);

		return res.status(201).send(file);
	},

	async deleteFile(req, res, next) {
		if (!req.params.fileId) {
			return res.status(406).send("fileId required");
		}

		const data = await db.File.findByPk(req.params.fileId);

		if (!data) {
			return res.status(404).send("No file found");
		}

		await data.destroy();

		const filename = data.imageUrl.split("/images/")[1];
		fs.unlink(`images/${filename}`, (err) => {
			if (err) return res.status(500).send(err);
		});

		return res.status(201).send("file successfully deleted");
	},
};
