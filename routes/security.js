const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/whoami", async (req, res) => {
  //récupère le token
});

/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - Security
 *    decription: login route
 *    parameters:
 *      - name: username
 *        description: user's email
 *        in: formData
 *        type: string
 *        required: true
 *      - name: password
 *        description: user's password
 *        in: formData
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description : success
 *
 */
router.post("/login", async (req, res) => {
  const userByUsername = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((err) => {
    console.log("error");
  });

  if (!userByUsername) {
    return res.json({
      message: "Login or password wrong",
    });
  }

  if (userByUsername.password !== req.body.password) {
    return res.json({
      message: "Login or password wrong",
    });
  }

  const JwTtoken = jwt.sign(
    {
      id: userByUsername.id,
      login: userByUsername.email,
    },
    process.env.secret || "tichio%11qw12"
  );

  res.json({
    status: 200,
    message: "successfully logged in",
    token: JwTtoken,
  });
});

/**
 * @swagger
 * /register:
 *   post:
 *    summary: Create a new user
 *    tags:
 *      - Security
 *    parameters:
 *      - name : username
 *        type: string
 *        required: true
 *        description: user's username
 *        in: formData
 *      - name: password
 *        type: string
 *        required: true
 *        description: user's password
 *        in: formData
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/register", (req, res) => {
  console.log(req.body);
  if (
    req.body.username &&
    req.body.password
  ) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((dataSubmited) => {
      res.send(dataSubmited);
    });
  } else {
    res.status(400);
    res.send("error in form");
  }
});

module.exports = router;
