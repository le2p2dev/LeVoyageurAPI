const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");
const { query } = require("express");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/trip:
 *  post:
 *    summary: create a new trip
 *    tags:
 *      - Trip
 *    parameters:
 *      - name : title
 *        description : title of the trip
 *        in: formData
 *        type: string
 *        required: true
 *      - name : description
 *        description : description of the trip
 *        in: formData
 *        type: string
 *        required: false
 *      - name : backgroundUrl
 *        description : url of the background image of the trip
 *        in : formData
 *        type : string
 *        required: false
 *      - name : startDate
 *        description : start date of the trip
 *        in : formData
 *        type : date
 *        required : false
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/", (req, res) => {
  if (
    req.body.title
  ){
    db.Trip.create({
      title: req.body.title,
      description: req.body.description,
      backgroundUrl: req.body.backgroundUrl,
      startDate: req.body.startDate
    }).then((dataSubmited) => {
      res.send({
        statut: 200,
        response: dataSubmited,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/trip:
 *  get:
 *    summary: get all trips
 *    tags:
 *      - Trip
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/", (req, res) => {
  db.Trip.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/trip/:{id} :
 *    get:
 *      summary: get trip by id
 *      tags:
 *        - Trip
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: params
 *          description: id of the trip
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/:id", (req, res) => {
  const queryParm = req.params;

  if (queryParm.id) {
    db.Trip.findAll({
      where: {
        id: queryParm.id,
      },
    }).then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/trip/{id} :
 *  delete:
 *    summary: delete trip by id
 *    tags:
 *      - Trip
 *    parameters:
 *      - name : id
 *        in: formData
 *        required: true
 *        type: integer
 *        description: description de l'id
 *    responses:
 *      '200':
 *        description: OK
 */
router.delete("/:id", (req, res) => {
  if (req.body.id) {
    db.Trip.destroy({
      where: {
        id: req.body.id,
      },
    }).then(() => {
      res.send({
        status: 200,
        response: "success",
      });
    });
  }
});

module.exports = router;
