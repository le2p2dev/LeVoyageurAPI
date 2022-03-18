const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/step:
 *  post:
 *    summary: create a new step
 *    tags:
 *      - Step
 *    parameters:
 *      - name : title
 *        description : title of the step
 *        in: formData
 *        type: string
 *        required: true
 *      - name: description
 *        description: description of the step
 *        in: formaData
 *        type: string
 *        required: false
 *      - name : duration
 *        description: duration of the step
 *        in : formData
 *        type: integer
 *        required: false
 *      - name : tripId
 *        description: id of the trip which the step is attached
 *        in : formData
 *        type: integer
 *        required: false
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/", (req, res) => {
  if (
    req.body.title
  ){
    db.Step.create({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      TripId: req.body.tripId
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
 * /api/step:
 *  get:
 *    summary: get all trips
 *    tags:
 *      - Step
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/", (req, res) => {
  db.Step.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/step/{id} :
 *    get:
 *      summary: get step by id
 *      tags:
 *        - Step
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: path
 *          description: id of the step
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/:id", (req, res) => {

  if (req.params.id) {
    db.Step.findAll({
      where: {
        id: req.params.id,
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
 * /api/step/ :
 *  delete:
 *    summary: delete step by id
 *    tags:
 *      - Step
 *    parameters:
 *      - name : id
 *        in: formData
 *        required: true
 *        type: integer
 *        description: id of the step who want delete
 *    responses:
 *      '200':
 *        description: OK
 */
router.delete("/", (req, res) => {
  if (req.body.id) {
    db.Step.destroy({
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
 * /api/step/trip/{id} :
 *    get:
 *      summary: get all step by tripId
 *      tags:
 *        - Step
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: path
 *          description: id of the trip who want all step
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 *
 */
 router.get("/trip/:id", (req, res) => {

  if (req.params.id) {
    db.Step.findAll({
      where: {
        TripId: req.params.id,
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