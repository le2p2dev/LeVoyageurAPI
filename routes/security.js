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
 *      - name: email
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
  const userByEmail = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).catch((err) => {
    console.log("error");
  });

  if (!userByEmail) {
    return res.json({
      message: "Login or password wrong",
    });
  }

  if (userByEmail.password !== req.body.password) {
    return res.json({
      message: "Login or password wrong",
    });
  }

  const JwTtoken = jwt.sign(
    {
      id: userByEmail.id,
      login: userByEmail.email,
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
 *      - name : email
 *        type: string
 *        required: true
 *        description: user's email
 *        in: formData
 *      - name: password
 *        type: string
 *        required: true
 *        description: user's password
 *        in: formData
 *      - name: lastname
 *        type: string
 *        required: true
 *        description : family name
 *        in: formData
 *      - name: firstname
 *        type: string
 *        description : first name
 *        required: true
 *        in: formData
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/register", (req, res) => {
  console.log(req.body);
  if (
    req.body.lastname &&
    req.body.firstname &&
    req.body.email &&
    req.body.password
  ) {
    db.User.create({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
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
