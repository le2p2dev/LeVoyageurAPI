const db = require("../models/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(406).send("Data missing");
    }
    const data = await db.User.findOne({
      where: { username: req.body.username },
    });

    if (data) {
      return res
        .status(406)
        .send("User: " + req.body.username + " allready exist");
    }

    bcrypt
      .hash(req.body.password, 10)
      .then((hash) =>
        db.User.create({
          username: req.body.username,
          password: hash,
        })
      )
      .then((data) => {
        return res.status(201).send(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },

  login(req, res, next) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send("wrong login");
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).send("wrong password");
            }

            return res.status(200).send({
              userId: user.id,
              token: jwt.sign(
                {
                  password: user.password,
                  id: user.id,
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

  // async whoami(req, res, next) {
  //   const token = jwt.sign(
  //     {
  //       userName: req.user.username,
  //     },
  //     "RANDOM_TOKEN",
  //     {
  //       expiresIn: "24h",
  //     }
  //   );

  //   return res.status(200).send(token);
  // },
};
