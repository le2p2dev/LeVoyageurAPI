const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/marker/all:
 *  get:
 *    tags :
 *      - Marker
 *    decription: get all marker
 *    responses:
 *      '200':
 *        description: Success
 */
router.get("/all", (req, res) => {
  db.Marker.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/marker/find:
 *  get:
 *    tags :
 *      - Marker
 *    decription: get a marker by id
 *    parameters:
 *      - name: id
 *        description: id du marker
 *        in: query
 *    responses:
 *      '200':
 *        description: Success
 */
router.get("/find/", (req, res) => {
  const queryParm = req.query;

  if (queryParm.id) {
    db.Marker.findAll({
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
 * paths:
 *  /api/marker/create:
 *    post:
 *      summary: create new marker
 *      tags:
 *        - Marker
 *      parameters:
 *      - name: pinNumber
 *        description: number of the pin
 *        in: formData
 *        type: integer
 *        required: false
 *      - name: title
 *        description : title of the pin
 *        in: formData
 *        type: string
 *        required: true
 *      - name: description
 *        description : description of the pin
 *        in: formData
 *        type: string
 *        required: false
 *      - name: latitude
 *        description: Latitude of the pin
 *        in: formData
 *        type: number
 *        required: true
 *      - name: longitude
 *        description: Longitude
 *        in: formData
 *        type: number
 *        required: true
 *      - name: stepId
 *        description: step id of the marker
 *        in: formData
 *        type: number
 *        required: false
 *      - name: tripId
 *        description: trip id of the marker
 *        in: formData
 *        type: number
 *        required: false
 *      responses:
 *        "200":
 *          descirption: OK
 */
router.post("/create", (req, res) => {
  if (req.body.latitude && req.body.longitude && req.body.title) {
    db.Marker.create({
      pinNumber: req.body.pinNumber,
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      StepId: req.body.stepId,
      TripId: req.body.tripId,
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
 * paths:
 *  /api/marker/delete/{id}:
 *    delete:
 *      summary: delete a new marker
 *      tags:
 *        - Marker
 *      parameters:
 *      - name: id
 *        description: id of the pin
 *        in: formData
 *        type: integer
 *        required: true
 *      responses:
 *        "200":
 *          descirption: OK
 *
 */
router.delete("/delete/:id", (req, res) => {
  if (req.body.id) {
    db.Marker.destroy({
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

/**
 * @swagger
 * paths:
 *  /edit:
 *    put:
 *      summary: change new marker [not usable !]
 *      tags:
 *        - Marker
 *      responses:
 *        "200":
 *          descirption: OK
 *
 */
router.put("/edit", (req, res) => {
  res.status(404).send("Method not allowed atm");
});

/**
 * @swagger
 * /api/marker/findbytrip:
 *  get:
 *    tags :
 *      - Marker
 *    decription: get a marker by id
 *    parameters:
 *      - name: idTrip
 *        description: id of the trip
 *        in: query
 *    responses:
 *      '200':
 *        description: Success
 */
router.get("/findbytrip/", (req, res) => {
  const queryParm = req.query;

  if (queryParm.id) {
    db.Marker.findAll({
      where: {
        TripId: queryParm.id,
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

module.exports = router;
