const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");
const { query } = require("express");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/poi:
 *  post:
 *    summary: create a new point of interest
 *    tags:
 *      - Point Of Interest
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
 *      - name : longitude
 *        description : longitude of the poi
 *        in : formData
 *        type : double
 *        required: true
 *      - name : latitude
 *        description : latitude of the poi
 *        in : formData
 *        type : double
 *        required : true
 *      - name : poiType
 *        description : type of the poi
 *        in : formData
 *        type : integer
 *        required : false
 *      - name : tripId
 *        description : id of the trip which the poi is attached
 *        in : formData
 *        type : integer
 *        required : false
 *      - name : stepId
 *        description : id of the step which the poi is attached
 *        in : formData
 *        type : integer
 *        required : false
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/", (req, res) => {
  if (
    req.body.latitude,
    req.body.longitude,
    req.body.title
  ){
    db.Trip.create({
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
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
 * /api/poi:
 *  get:
 *    summary: get all pois
 *    tags:
 *      - Point Of Interest
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/", (req, res) => {
  db.Poi.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/poi/:{id} :
 *    get:
 *      summary: get poi by id
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: params
 *          description: id of the poi
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/:id", (req, res) => {
  const queryParm = req.params;

  if (queryParm.id) {
    db.Poi.findAll({
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
 * /api/poi/trip/:{tripId} :
 *    get:
 *      summary: get all poi by tripId
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : tripId
 *          type: integer
 *          in: params
 *          description: id of the trip who want all pooi
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 */
 router.get("/trip/:tripId", (req, res) => {
  const queryParm = req.params;

  if (queryParm.tripId) {
    db.Trip.findAll({
      where: {
        TripId: queryParm.tripId,
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
 * /api/poi/{id} :
 *  delete:
 *    summary: delete poi by id
 *    tags:
 *      - Point Of Interest
 *    parameters:
 *      - name : id
 *        in: formData
 *        required: true
 *        type: integer
 *        description: id of the poi
 *    responses:
 *      '200':
 *        description: OK
 */
router.delete("/:id", (req, res) => {
  if (req.body.id) {
    db.Poi.destroy({
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
