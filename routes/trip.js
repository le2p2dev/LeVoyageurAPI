const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/trip/all:
 *  get:
 *    summary: get all trips
 *    tags:
 *      - Trip
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/all", (req, res) => {
  db.Trip.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/trip/find:
 *    get:
 *      summary: get trip by id
 *      tags:
 *        - Trip
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: query
 *          description: id of the trip
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/find", (req, res) => {
  const queryParm = req.query;

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
 * /api/trip/create:
 *  post:
 *    summary: create a new trip
 *    tags:
 *      - Trip
 *    parameters:
 *      - name : TripName
 *        description : name of the trip
 *        in: formData
 *        type: string
 *        required: true
 *      - name : Description
 *        in: formData
 *        description: description of the trip
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/create", (req, res) => {
  if (
    req.body.tripName && 
    req.body.Description
  ){
    db.Trip.create({
      tripName: req.body.TripName,
      description: req.body.Description,
      startDate: req.body.StartDate,
      endDate: req.body.EndDate,
      order: req.body.Order
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
 * /api/trip/delete/{id}:
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
router.delete("/delete/:id", (req, res) => {
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
