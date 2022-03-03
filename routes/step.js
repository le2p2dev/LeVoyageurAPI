const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

router.get("/all", (req, res) => {
    db.Step.findAll().then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
});

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

router.post("/create", (req, res) => {
    if (
        req.body.StepName &&
        req.body.TripId
    ) {
      db.Step.create({
        stepName: req.body.StepName,
        startDate: req.body.StartDate,
        endDate: req.body.EndDate,
        TripId: req.body.TripId,
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
  
module.exports = router;