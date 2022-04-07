const db = require("../models/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup(req, res, next) {
    const username = req.body.username;
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) =>
        db.User.create({
          username: username,
          password: hash,
        })
      )
      .then(() => res.status(201).send("OK"))
      .catch((err) => res.status(400).send(err))
      .catch((err) => res.status(500).send(err));
  },

  login(req, res, next) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.send(401).status("wrong login");
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.send(401).status("wrong password");
            }
            res.status(200).send({
              userId: user.id,
              token: jwt.sign(
                {
                  userId: user.id,
                },
                "RANDOM_TOKEN",
                {
                  expiresIn: "24h",
                }
              ),
            });
          })
          .catch((err) => res.status(500).send(err)); // server error
      })
      .catch((err) => res.status(500).send(err)); // server error
  },
};
