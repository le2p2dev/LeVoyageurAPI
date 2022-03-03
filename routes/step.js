const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/step/all:
 *  get:
 *    summary: get all steps
 *    tags:
 *      - Step
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/all", (req, res) => {
    db.Step.findAll().then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
});

/**
 * @swagger
 * /api/step/find:
 *    get:
 *      summary: get step by id
 *      tags:
 *        - Step
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: query
 *          description: id of the step
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/find", (req, res) => {
    const queryParm = req.query;
  
    if (queryParm.id) {
      db.Step.findAll({
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
 * /api/step/delete/{id}:
 *  delete:
 *    summary: delete step by id
 *    tags:
 *      - Step
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
 * /api/step/create:
 *  post:
 *    summary: create a new step
 *    tags:
 *      - Step
 *    parameters:
 *      - name : StepName
 *        description : name of the step
 *        in: formData
 *        type: string
 *        required: true
 *     - name : TripId
 *        description : id of the trip
 *        in: formData
 *        type: int
 *        required: true
 *     - name : StartDate
 *        description : start date of the step
 *        in: formData
 *        type: date
 *        required: false
 *     - name : EndDate
 *        description : end date of the step
 *        in: formData
 *        type: date
 *        required: false
 *     - name : Order
 *        description : order of the step in the trip
 *        in: formData
 *        type: int
 *        required: false
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/create", (req, res) => {
    if (
        req.body.stepName &&
        req.body.tripId
    ) {
      db.Step.create({
        stepName: req.body.stepName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        tripId: req.body.tripId,
        order: req.body.order
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
  
module.exports = router;