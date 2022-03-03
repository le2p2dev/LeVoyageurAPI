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
 *        required: true
 *      - name: Title
 *        description : title of the pin
 *        in: formData
 *        type: string
 *        required: true
 *      - name: Description
 *        description : description of the pin
 *        in: formData
 *        type: string
 *        required: true
 *      - name: Latitude
 *        description: Latitude of the pin
 *        in: formData
 *        type: number
 *        required: true
 *      - name: Longitude
 *        description: Longitude
 *        in: formData
 *        type: number
 *        required: true
 *
 *      responses:
 *        "200":
 *          descirption: OK
 *
 */
router.post("/create", (req, res) => {
  if (
    req.body.Latitude &&
    req.body.Longitude
  ) {
    db.Marker.create({
      pinNumber: req.body.pinNumber,
      title: req.body.Title,
      description: req.body.Description,
      latitude: req.body.Latitude,
      longitude: req.body.Longitude,
      StepId: req.body.StepId,
      TripId: req.body.TripId
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
 *      summary: change new marker [not working atm !]
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

router.get("/findbytrip/", (req, res) => {
  const queryParm = req.query;
  console.log(queryParm)

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
