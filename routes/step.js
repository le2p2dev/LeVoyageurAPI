const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");

//définition du router
const router = express.Router();

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

router.get("/", (req, res) => {
  db.Step.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

router.get("/:id", (req, res) => {

  if (req.params.id) {
    db.Step.findAll({
      where: {
        id: req.path.id,
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

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    db.Step.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.send({
        status: 200,
        response: "success",
      });
    });
  }
});

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

router.put("/:id", (req, res) => {
  db.Step.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(data){
      const values = {
        title : req.body.title,
        description : req.body.description,
        duration: req.body.duration,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }

      data.update(values).then(updateData => {
        console.log(`updated record ${JSON.stringify(updateData,null,2)}`)
      }).then((updateData) => {
        res.send({
          status: 200,
          response: updateData
        })
      })
    } else {
      res.status(204).send()
    }
  })
});

module.exports = router;