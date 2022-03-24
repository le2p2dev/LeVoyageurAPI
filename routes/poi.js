const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");
const { query } = require("express");
const { is } = require("express/lib/request");

//définition du router
const router = express.Router();

router.post("/", (req, res) => {
  if (
    req.body.latitude,
    req.body.longitude
  ){
    db.Poi.create({
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      StepId: req.body.stepId,
      TripId: req.body.tripId,
      PoitypeId: req.body.poiType
    }).then((dataSubmited) => {
      res.send({
        statut: 200,
        response: dataSubmited,
      })
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

router.get("/", (req, res) => {
  db.Poi.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

router.get("/:id", (req, res) => {
  const queryParm = req.params;

  if (req.params.id) {
    db.Poi.findAll({
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

router.get("/trip/:tripId", (req, res) => {

  if (req.params.tripId) {
    db.Poi.findAll({
      where: {
        TripId: req.params.tripId,
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

router.get("/step/:stepId", (req, res) => {

  if (req.params.stepId) {
    db.Poi.findAll({
      where: {
        StepId: req.params.stepId,
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
  db.Poi.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(data){
      const values = {
        title : req.body.title,
        description : req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        StepId: req.body.stepId,
        TripId: req.body.tripID,
        PoitypeId: req.body.poiType
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
})

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    db.Poi.findOne({
      where: {
        id: req.params.id
      }
    }).then(data => {
      if(data){
        db.Poi.destroy({
          where: {
            id: req.params.id,
          },
        }).then(() => {
          res.send({
            status: 200,
            response: "success",
          });
        });
      }else {
        res.status(204).send()
      }
    })
  }
});

module.exports = router;
